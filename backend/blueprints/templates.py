import logging

from flask import Blueprint, Flask, current_app, json, jsonify, render_template, request, url_for, make_response
from flasgger import Swagger
from flask_api import status    # HTTP Status Codes
from werkzeug.local import LocalProxy


from utils.email import process_email

template_blueprint = Blueprint('actions', __name__, template_folder='templates')

logger = LocalProxy(lambda: current_app.logger)

@template_blueprint.route("/templates", methods=['POST'])
def send_template():
    """
    Sends template
    This endpoint will generate a log entry based on profile key and severity.
    ---
    tags:
      - Templates
    description: Create a new Tag
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: name
        required: true
        schema:
          id: script_data
          required:
            - name
          properties:
            name:
              type: string
              description: Profile Key
    responses:
      201:
        description: Tag created
        schema:
          $ref: '#/definitions/Tag'
      400:
        description: Bad Request (the posted data was not valid)
    """
    try:
        data = request.json
        template = data.get("template","") 
        values =  data.get("values", []) 
        process_email(template=template, values=values)
        result = {"message": "successfully sent email"}
        logger.info("Successfully sent email ...")
        return make_response(jsonify(result), status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"==> It just didn't work - {e}")
        result = {"message": f"error sending email {e}"}
        return make_response(jsonify(result), status.HTTP_500_INTERNAL_SERVER_ERROR)
