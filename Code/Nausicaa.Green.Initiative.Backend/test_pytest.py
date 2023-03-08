from app import app,generate_jwt # Flask instance of the API
import json
from unittest import mock
from flask import request, jsonify, make_response


# from mock import patch
jwt = generate_jwt()
bearer_token = "Bearer "+jwt


def test_index_route():
    response = app.test_client().get('/')
    assert response.status_code == 200
    data = """
    {"List of users":[{"user1":"Ankhush","User2":"Ganesh"}]}
    """
    assert response.json["data"] == json.loads(data)
    
def test_getGrants():
    mock_response = mock.Mock()
    mock_response.json = """
    { 'data' :
        [{'grant_id': Decimal('3'), 'name': 'education grant', 'desc': 'Education grant for kids'}, {
    'grant_id': Decimal('2'), 'name': 'Wind Blades', 'desc': 'Wind blades on coastal sides'}]
    }
    """
    headers = {"Authorization": bearer_token}
    response = app.test_client().get('/grants',headers = headers)
    print(response.json)
    assert response.status_code == 200
    data = response.json["data"]
    for x in data:
        assert x["grant_id"].isnumeric()
        assert isinstance(x["name"], str)
    assert response.json["message"] == "Data fethced"

@mock.patch('app.loggedInUsername', "ToniThomas")    
def test_createUser():
    headers = {"Authorization": bearer_token, "Content-Type": "application/json"}
    data = {
        "email_id":"l00171045@atu.ie",
        "first_name": "toni",
        "last_name": "thomas",
        "address": "89 avenue"
        }
    response = app.test_client().post('/signin',data = json.dumps(data),headers = headers)
    assert response.status_code == 200
    data = response.json["data"]
    assert response.json["message"] == "User Created Successfully"

@mock.patch('app.loggedInUsername', "ToniThomas")  
@mock.patch('app.uuid.uuid4')
def test_createRequest(mock_uuid4):
    mock_uuid4.return_value = '1e3b064d-75e6-4076-8559-2b7b1f3ec6e0'
    headers = {"Authorization": bearer_token, "Content-Type": "application/json"}
    data = {
        "grant_id":"1",
        "summary": "grant for education",
        "amount": "555"
        }
    response = app.test_client().post('/request',data = json.dumps(data),headers = headers)
    print(response.json)
    assert response.status_code == 200
    data = response.json["data"]
    assert response.json["message"] == "Request Created Successfully"


# def test_getRequests():
#     mock_response = mock.Mock()
#     mock_response.json = """
#     { 'data' :
#         [{
#             "amount": "1231",
#             "created_date": "2023-01-23 20:43:48.573569",
#             "email_id": "l00171045@atu.ie",
#             "grant_desc": "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo2.",
#             "grant_id": "1",
#             "grant_name": "Super Grant III",
#             "request_id": "33875a6c-e180-4c1b-8f0f-8da701ae3fa0",
#             "status": "Approved",
#             "summary": "asdasd",
#             "username": "40bb0ab7-a966-44b2-9773-a127e29bd708"
#         },
#         {
#             "amount": "1500",
#             "created_date": "2023-01-23 20:37:21.599611",
#             "email_id": "l00171045@atu.ie",
#             "grant_desc": "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo2.",
#             "grant_id": "1",
#             "grant_name": "Super Grant III",
#             "request_id": "0d9eba55-d03c-4d67-8543-9c2f02210c15",
#             "status": "Pending",
#             "summary": "For Foxhill Oldies",
#             "username": "40bb0ab7-a966-44b2-9773-a127e29bd708"
#         }]
#     }
#     """
#     headers = {"Authorization": bearer_token}
#     response = app.test_client().get('/user_request',headers = headers)
#     print(response.json)
#     assert response.status_code == 200
#     data = response.json["data"]
#     for x in data:
#         assert x["grant_id"].isnumeric()
#         assert isinstance(x["grant_name"], str)
#         assert isinstance(x["status"], str)
#     assert response.json["message"] == "Data fethced"


def test_UpdateRequest():
    headers = {"Authorization": bearer_token, "Content-Type": "application/json"}
    data = {
        "request_id":"1",
        "status": "grant for education"
        }
    response = app.test_client().put('/user_request',data = json.dumps(data),headers = headers)
    print(response.json)
    assert response.status_code == 200
    data = response.json["data"]
    assert response.json["message"] == "Request Updated Successfully"