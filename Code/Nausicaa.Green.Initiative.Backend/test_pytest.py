from app import app # Flask instance of the API
import json
from unittest import mock 

def test_index_route():
    response = app.test_client().get('/')

    assert response.status_code == 200
    data = """
    {"List of users":[{"user1":"Ankhush","User2":"Ganesh"}]}
    """
    assert response.json["data"] == json.loads(data)
    
def test_getGrants():
    mock_response = mock.Mock()
    mock_response.status_code = 200
    headers = {"Authorization": "Bearer MYREALLYLONGTOKENIGOT"}
    mock_response.json = """
    { 'data' :
        [{'grant_id': Decimal('3'), 'name': 'education grant', 'desc': 'Education grant for kids'}, {
    'grant_id': Decimal('2'), 'name': 'Wind Blades', 'desc': 'Wind blades on coastal sides'}]
    }"""
    response = app.test_client().get('/grants',headers = headers)
    assert response.status_code == 200
    data = response.json["data"]
    for x in data:
        assert x["grant_id"].isnumeric()
        assert isinstance(x["name"], str)
    assert response.json["message"] == "Data fethced"