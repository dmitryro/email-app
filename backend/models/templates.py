from flask import Flask
from marshmallow_sqlalchemy import ModelSchema
from flask_marshmallow import Marshmallow
from flask_marshmallow.fields import fields
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import *

Base = declarative_base()

app = Flask(__name__, instance_relative_config=True)
ma = Marshmallow(app)


class Tag(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), unique=True)
    timestamp_created = Column(DateTime(timezone=True), server_default=func.now())

    __tablename__ = "tags"

    def __init__(self, name=None, timestamp_created=func.now()):
        self.name = name
        self.timestamp_created=timestamp_created

    def __repr__(self):
        return f"<Tag {self.name}>"


class UsedTag(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    value = Column(String(2256), unique=False)     
    tag_id = Column(Integer, ForeignKey('tags.id', ondelete='CASCADE') , unique=False, nullable=False)
    timestamp_created = Column(DateTime(timezone=True), server_default=func.now())

    __tablename__ = "usedtags"      

    def __init__(self,
                 value=None,
                 tag_id=None,
                 timestamp_created=func.now()):
        self.value = value
        self.tag_id = tag_id
        self.timestamp_created = timestamp_created

    def __repr__(self):
        return f"<UsedTag {self.id} {self.value} {self.tag_id} {self.timestamp_created}>"

class Template(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    body = Column(String(2256), unique=False)
    tags = relationship("UsedTag", secondary="template_usedtag_link")
    timestamp_created = Column(DateTime(timezone=True), server_default=func.now())

    __tablename__ = "templates"

    def __init__(self,
                 body=None,
                 timestamp_created=func.now()):
        self.body=body
        self.timestamp_created=timestamp_created

    def __repr__(self):
        return f"<Template {body} {timestamp_created}>"


class TemplateUsedTagLink(Base):
    __tablename__ = 'template_usedtag_link'
    id = Column(Integer, primary_key=True)
    template_id = Column(Integer, ForeignKey('templates.id'))
    usedtag_id = Column(Integer, ForeignKey('usedtags.id'))


class TagSchema(ModelSchema):
    """ Use this schema to serialize tags """
    class Meta:
        fields = ("id", "name",)


class UsedTagSchema(ModelSchema):
    """ Use this schema to serialize used tags """
    class Meta:
        fields = ("id", "tag_id", "value","timestamp_created",)


class TemplateSchema(ModelSchema):
    """ Use this schema to serialize actions """
    tags = fields.Nested(UsedTagSchema)

    class Meta:
        fields = ("id", "timestamp_created", "body",)
