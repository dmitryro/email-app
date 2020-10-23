DO
$do$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = 'postgres') THEN
      RAISE NOTICE 'Database already exists';  -- optional
   ELSE
      PERFORM dblink_exec('dbname=' || current_database()  -- current db
                        , 'CREATE DATABASE postgres');
   END IF;
END
$do$;

ALTER ROLE postgres SET client_encoding TO 'utf8';
ALTER ROLE postgres SET default_transaction_isolation TO 'read committed';
ALTER ROLE postgres SET timezone TO 'America/New_York';
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

CREATE SEQUENCE tag_id_seq;

CREATE TABLE tags (
        id integer NOT NULL DEFAULT nextval('tag_id_seq'),
        name varchar(100) NOT NULL UNIQUE,
        timestamp_created timestamptz DEFAULT NOW(), 
        UNIQUE(id)
    );

CREATE SEQUENCE usedtag_id_seq;

CREATE TABLE usedtags(
        id integer NOT NULL DEFAULT nextval('usedtag_id_seq'),
        timestamp_created timestamptz DEFAULT NOW(),
        value  varchar(2500) NOT NULL UNIQUE,
        tag_id integer NOT NULL,
        FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE,
        UNIQUE(id) 
    );

CREATE SEQUENCE template_id_seq;

CREATE TABLE templates (
        id integer NOT NULL DEFAULT nextval('template_id_seq'),
        timestamp_created timestamptz DEFAULT NOW(),
        body varchar(2500) NOT NULL UNIQUE,
        UNIQUE(id)
);


CREATE SEQUENCE template_usedtag_link_id_seq;

CREATE TABLE template_usedtag_link (
        id integer NOT NULL DEFAULT nextval('template_usedtag_link_id_seq'),
        template_id integer NOT NULL,
        usedtag_id integer NOT NULL,
        FOREIGN KEY(template_id) REFERENCES templates(id) ON DELETE CASCADE,
        FOREIGN KEY(usedtag_id) REFERENCES usedtags(id) ON DELETE CASCADE
);


ALTER SEQUENCE tag_id_seq
OWNED BY tags.id;

ALTER SEQUENCE template_id_seq
OWNED BY templates.id;

ALTER SEQUENCE usedtag_id_seq
OWNED BY usedtags.id;

ALTER SEQUENCE template_usedtag_link_id_seq
OWNED BY template_usedtag_link.id;
