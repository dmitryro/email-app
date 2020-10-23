import codecs
from datetime import datetime
import logging
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from smtplib import SMTPRecipientsRefused
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)
read_env = lambda property: os.environ.get(property, None) 


def process_email(*args, **kwargs):
    template = kwargs.get("template",  "")
    values = kwargs.get("values", [])
 
    try:
        timeNow = datetime.now()
        FROM_EMAIL = read_env('FROM_EMAIL')
        USERNAME = read_env('USERNAME')
        PASSWORD = read_env('PASSWORD')
        SMTP_PORT = read_env('SMTP_PORT')
        SMTP_HOST = read_env('SMTP_HOST')
        TO_EMAIL = read_env('TO_EMAIL')
        FROM = f'Simon <{FROM_EMAIL}>'
        SUBJECT = "New message from a customer"

        for v in values:
            opening = "{{"
            closing = "}}"
            key = list(v.keys())[0] 
            value = v[key]
            
            #In case we passed to and from, use them
            if key == 'to':
                TO_EMAIL = value
                template = str.replace(template, f"{opening}{key}{closing}", "")
            elif key == 'from':
                FROM =value
                template = str.replace(template, f"{opening}{key}{closing}", "")
            else:
                template = str.replace(template, f"{opening}{key}{closing}", value)

        MESSAGE = MIMEMultipart('alternative')
        MESSAGE['subject'] = SUBJECT
        MESSAGE['To'] = TO_EMAIL
        MESSAGE['From'] = FROM_EMAIL
        MESSAGE.preamble = """
                Your mail reader does not support the report format.
                Please visit us <a href="http://www.mysite.com">online</a>!"""

        HTML_BODY  = MIMEText(template, 'html','utf-8')
        MESSAGE.attach(HTML_BODY)
        msg = MESSAGE.as_string()
        server = smtplib.SMTP(SMTP_HOST+':'+SMTP_PORT)
        server.ehlo()
        server.starttls()
        server.login(USERNAME, PASSWORD)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg)
        server.quit()
        print("Successfully sent email")
    except Exception as e:
        print(f"Error sending email ...{e}")
        logger.error(f"Error sending email {e}") 

