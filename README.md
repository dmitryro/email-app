# Docker Flask React Email Template 

A basic [Docker Compose](https://docs.docker.com/compose/) app that ustilizes React/Mobx, Flask,
Gunicorn, Nginx and used to design and send simple email template.

### Installation

```bash
git clone https://github.com/dmitryro/email-app
```

### Build & Launch

```bash
docker-compose up -d --build
```

This will expose the Flask application's endpoints on port `5000`, nginx on port 89 
and React/Material UI on port `8000`

To shut down:

```bash
docker-compose down
```

### To run GUI:
Once the API has started and is running, navigate your broser to:

```
http://0.0.0.0:8000
```

In the left section you'll see the dropdown list to select tags used
to design email, below it there will be a textarea to provide text that
is not covered by tags.
If you're not happy with design, you can reset it in the middle section.
If you click preview, you'll be able to review the progress as it's made
in two modes: the template with values populated and the template with tags.
Once you click "Send" it will send email to the default 


