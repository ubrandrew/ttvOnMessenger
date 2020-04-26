from flask import request, jsonify send_file
API_BASE_ROUTE = '/api'


# format of request:
'''
{
    name: <String>
    password: <String> (optional)
}
'''
@app.route(API_BASE_ROUTE + '/groups', methods=['POST'])
def create_groups():

    return 