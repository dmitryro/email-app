# Back End API compoment of the email template app 
 - a RESTful endpoint to send email from template provided

Implemented using `Flask` and deployed using `Gunicorn` and `nginx`.

To use run 
```
docker-compose up -d --build
```
and open browser at `0.0.0.0:5000`, `0.0.0.0` with nginx, or use Postman or curl to hit.



# RESTful Endpoints

`API` is a Flask application running using Gunicorn. 

   `/templates`
       Expects two paramters from POST payload: `template` - a string value of the template to be used
       and `values` - a list of dictionaries in `[{'key1':'val1'}, {'key2':'val2'}...]` representing tags
       used and their values. Returns status 200 if no error, failure code otherwise.
       ## Sample Payload:
       ```
       {"template": "Dear {{contact_first_name}}! We are ready to previde {{discount_rate}} discount!",
        "values": [{"contact_first_name":"John"}, {"discount_rate":"20%"}]}

       ```
# Email utilities
   `SMTP` messaging is used, values should be specified in `.env` to be used, or provided using `{{to}}` and
   `{{from}}` tags in the list of values.


# Swagger
   To use swagger for testing endpoints, navigate to `0.0.0.0/apidocs` and select any endpoints there

