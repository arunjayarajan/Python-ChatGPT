from flask import Flask,request, jsonify, make_response
import cognitojwt
from functools import wraps
import boto3
import os

#Creating Env variables for now
#Boto3 IAM User creds
os.environ['AWS_ACCESS_KEY_ID'] = 'AKIAZFYBK7LREBFIY26J'
os.environ['AWS_SECRET_ACCESS_KEY'] = '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'
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'

# DynamoDB Variables
user_table = "user"
user_Primary_Column = 'email_id'
grant_table = "grant"
grant_Primary_Column = 'name'
columns=["name","desc","max_amount"]

#Cognito Variables
clientId="2sv2m6aama08vnbvbqke0sd35s"
userPoolId ="us-east-1_utwdLyAkQ"


# ACCESS_KEY= os.getenv('AWS_ACCESS_KEY_ID')
# SECRET_KEY=os.getenv('AWS_SECRET_ACCESS_KEY')

app = Flask(__name__)

def decorator(takes_a_function):
    @wraps(takes_a_function)
    def wrapper(*args, **kwargs):
        try:
            cognitojwt.decode(
            request.headers.get('Authorization').split()[1],
            'us-east-1',
            userPoolId,
            )
        except Exception as e:
            return make_response(jsonify(message="Unauthorized request. Client does not have access to the content."), 403)
        return takes_a_function(*args, **kwargs)
    return wrapper

@app.route("/user",methods = ['POST'])
def createUser():
    args = request.args
    email_id = args.get('email_id')
    first_name = args.get('first_name')
    last_name = args.get('last_name')
    address = args.get('address')
    
    try:
        DB = boto3.resource(
            'dynamodb')
        
        table = DB.Table(user_table)
        response = table.put_item(
            Item={
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

@app.route("/grants",methods = ['GET'])
@decorator
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
    
# @app.route("/login",methods = ['GET'])
# def login():
#     args = request.args
#     email_id = args.get('email_id')
#     password = args.get('password')
    
#     client = boto3.client('cognito-idp')
#     try:
#         response = client.initiate_auth(
#         ClientId= clientId,
#         AuthFlow='USER_PASSWORD_AUTH',
#         AuthParameters={
#         'USERNAME': email_id,
#         'PASSWORD': password
#             }
#             )
#     # except client.exceptions.NotAuthorizedException as e:
#     #     data="{}".format(e)
#     #     message="User login unsuccessful"
#     except Exception as e:
#         data="{}".format(e)
#         message="User login unsuccessful"
#         status=400
#     else:
#         data=response['AuthenticationResult']  
#         message="User login successful"
#         status=200
#     return make_response(jsonify(
#                         message=message,
#                         data=data),
#                         status
#                     )

# @app.route("/grants",methods = ['POST'])
# # @decorator
# def insertGrant():
#     args = request.args
#     org = args.get('org')
#     fund = args.get('fund')
#     post = {'org' : org, 'fund' : fund,
#            'granted_flag' :"N", 'grantee_email' : ""}
    
#     with MongoClient(DB_URL) as client:
#         grants = client.project2.grants         
#         post_id = str(grants.insert_one(post).inserted_id)
#         return make_response(jsonify(
#                         message="Grant inserted",
#                         data=post_id),
#                         200
#                     )
        
if __name__ == "__main__":
    app.run(host='0.0.0.0')

        

