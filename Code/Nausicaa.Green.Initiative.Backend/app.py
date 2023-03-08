from datetime import datetime
import uuid
from flask import Flask,request, jsonify, make_response
import cognitojwt
from functools import wraps
import boto3
import os
from flask_cors import CORS
from boto3.dynamodb.conditions import Key, Attr

#Creating Env variables for now
#Boto3 IAM User creds
# os.environ['AWS_ACCESS_KEY_ID'] = 'AKIAV4K7H6GA2I5LMVHY'
# os.environ['AWS_SECRET_ACCESS_KEY'] = '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'
# os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'
# ACCESS_KEY= os.getenv('AWS_ACCESS_KEY_ID')
# SECRET_KEY=os.getenv('AWS_SECRET_ACCESS_KEY')

# DynamoDB Variables
user_table = "user"
request_table = "request"
grant_table = "grant"

# Cognito Variables
clientId="4c64595titjkevuvjqr7amr88j"
userPoolId ="us-east-1_HOKPXkW1F"


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": ["https://atu.tecminal.com", "http://localhost:4200"]}})   # Allow CORS for relevent sources

def decorator(takes_a_function):
    @wraps(takes_a_function)
    def wrapper(*args, **kwargs):
        try:
            authHeader = request.headers.get('Authorization')
            print(authHeader)
            if authHeader is None:
                raise ValueError('Could not find Authorization header')
            code = cognitojwt.decode(
            request.headers.get('Authorization').split()[1],
            'us-east-1',
            userPoolId,
            )
            print(code)
            # # Set logged in user here!
            global loggedInUsername
            loggedInUsername = code['username']

        except Exception as e:
            return make_response(jsonify(message="Unauthorized request. " + str(e)), 403)
        return takes_a_function(*args, **kwargs)
    return wrapper

# Meant to be called while signing in; Create the user if doesnt exist
@app.route("/signin",methods = ['POST'])
@decorator
def createUser():
    userJson = request.get_json()
    email_id = userJson['email_id']
    first_name = userJson['first_name']
    last_name = userJson['last_name']
    address = userJson['address']
    print(loggedInUsername)
    
    try:
        DB = boto3.resource(
            'dynamodb')
        
        table = DB.Table(user_table)
        response = table.put_item(
            Item={
                'username': loggedInUsername,
                'email_id': email_id,
                'first_name': first_name,
                'last_name':last_name,
                'address':address
            }
        )
    except Exception as e:
        response=[]
        message="{}".format(e)
        status=400
    else:
        response={
                'username': loggedInUsername,
                'email_id': email_id,
                'first_name': first_name,
                'last_name':last_name,
                'address':address
            }
        message="User Created Successfully"
        status=200
        
    return make_response(jsonify(
                        message=message,
                        data=response),
                        status
                    )

# Save a new grant request
@app.route("/request",methods = ['POST'])
@decorator
def createRequest():
    requestJson = request.get_json()
    request_id = uuid.uuid4()
    grant_id = requestJson['grant_id']
    summary = requestJson['summary']
    amount = requestJson['amount']
    created_date = datetime.now()
    status = 'Pending'
    print("request id "+request_id)
    print(created_date)
    
    try:
        DB = boto3.resource(
            'dynamodb')
        
        table = DB.Table(request_table)
        response = table.put_item(
            Item={
                'request_id':str(request_id),
                'username': loggedInUsername,
                'grant_id': grant_id,
                'summary':summary,
                'amount':amount,
                'created_date':str(created_date),
                'status':status,
            }
        )
    except Exception as e:
        response=[]
        message="{}".format(e)
        status=400
    else:
        response={
                'username': loggedInUsername,
                'grant_id': grant_id,
                'summary':summary,
                'amount':amount,
                'created_date':created_date,
                'status':status
            }
        message="Request Created Successfully"
        status=200
        
    return make_response(jsonify(
                        message=message,
                        data=response),
                        status
                    )

# List all grants
@app.route("/grants",methods = ['GET'])
def getGrants():
    DB =     boto3.resource(
            'dynamodb')
    table = DB.Table(grant_table)

    response = table.scan()
    output = response["Items"]
    return make_response(jsonify(
                    message="Data fethced",
                    data=output),
                    200
                )

# List all request for admin
@app.route("/user_request",methods = ['GET'])
@decorator
def getRequests():
    args = request.args
    request_status = args.get("status", default="All", type=str)
    DB =     boto3.resource(
            'dynamodb')
    req_table = DB.Table(request_table)
    grt_table = DB.Table(grant_table)
    usr_table = DB.Table(user_table)
    if (request_status == "All"):
        response = req_table.scan()
    else:
        response = req_table.scan(
        FilterExpression = Attr('status').eq(request_status)
        )
    output = response["Items"]
    for item in output:
        grt_response = grt_table.get_item(
        Key ={"grant_id":int(item["grant_id"]) }
        )
        usr_response = usr_table.get_item(
            Key = {"username":str(item["username"])}
        )
        item["grant_desc"]= grt_response["Item"]["desc"]
        item["grant_name"]= grt_response["Item"]["name"]
        item["username"]= usr_response["Item"]["username"]
        item["email_id"]= usr_response["Item"]["email_id"]
        
    return make_response(jsonify(
                    message="Data fethced",
                    data=output),
                    200
                )
    
# Save a new grant request
@app.route("/user_request",methods = ['PUT'])
@decorator
def UpdateRequest():
    requestJson = request.get_json()
    request_id = requestJson['request_id']
    status = requestJson['status']      
    try:
        DB = boto3.resource(
            'dynamodb')   
        table = DB.Table(request_table)
        response = table.update_item(
        Key={"request_id": request_id},
        UpdateExpression="set #status = :S",
        ExpressionAttributeNames={
            "#status": "status",
        },
        ExpressionAttributeValues={
            ":S": status,
        },
        ReturnValues="UPDATED_NEW",
        )
    except Exception as e:
        response=[]
        message="{}".format(e)
        status=400
    else:
        response={
                'request_id': request_id,
                'status':status
            }
        message="Request Updated Successfully"
        status=200
        
    return make_response(jsonify(
                        message=message,
                        data=response),
                        status
                    )
    

@app.route("/")
def home():
    data={"List of users":[{"user1":"Ankhush","User2":"Ganesh"}]}
    return make_response(jsonify(
                    message="Valid token and Verified",
                    data=data),
                    200
                )

def generate_jwt():
    client = boto3.client('cognito-idp')
    response = client.initiate_auth(
    ClientId=clientId,
    AuthFlow='USER_PASSWORD_AUTH',
    AuthParameters={
        'USERNAME': 'l00171045@atu.ie',
        'PASSWORD': 'Bolero#88'
    }
    )
    return response['AuthenticationResult']['AccessToken']






    
        
if __name__ == "__main__":
    app.run(host='0.0.0.0')
