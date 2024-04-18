
-- Use an admin role
USE ROLE ACCOUNTADMIN;

-- Create the `transform` role
CREATE ROLE IF NOT EXISTS transform;
GRANT ROLE TRANSFORM TO ROLE ACCOUNTADMIN;

-- Create the default warehouse if necessary
CREATE WAREHOUSE IF NOT EXISTS COMPUTE_WH;
GRANT OPERATE ON WAREHOUSE COMPUTE_WH TO ROLE TRANSFORM;

-- Create the `dbt` user and assign to role
CREATE USER IF NOT EXISTS dbt
  PASSWORD='---'
  LOGIN_NAME='dbt'
  MUST_CHANGE_PASSWORD=FALSE
  DEFAULT_WAREHOUSE='COMPUTE_WH'
  DEFAULT_ROLE='transform'
  DEFAULT_NAMESPACE='AMAZON.RAW'
  COMMENT='DBT user used for data transformation';
GRANT ROLE transform to USER dbt;

-- Create our database and schemas
CREATE DATABASE IF NOT EXISTS AMAZON;
CREATE SCHEMA IF NOT EXISTS AMAZON.RAW;

-- Set up permissions to role `transform`
GRANT ALL ON WAREHOUSE COMPUTE_WH TO ROLE transform; 
GRANT ALL ON DATABASE AMAZON to ROLE transform;
GRANT ALL ON ALL SCHEMAS IN DATABASE AMAZON to ROLE transform;
GRANT ALL ON FUTURE SCHEMAS IN DATABASE AMAZON to ROLE transform;
GRANT ALL ON ALL TABLES IN SCHEMA AMAZON.RAW to ROLE transform;
GRANT ALL ON FUTURE TABLES IN SCHEMA AMAZON.RAW to ROLE transform;


-- Set up the defaults
USE WAREHOUSE COMPUTE_WH;
USE DATABASE AMAZON;
USE SCHEMA RAW;

-- Create our three tables and import the data from S3
CREATE OR REPLACE TABLE reviews
                    (reviewerID varchar,
                     asin varchar,
                     overall integer,
                     unixReviewTime string);



CREATE STORAGE INTEGRATION s3_data
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = '---'
  STORAGE_ALLOWED_LOCATIONS = ('---');

DESC INTEGRATION s3_data;

USE SCHEMA AMAZON.RAW;


CREATE OR REPLACE FILE FORMAT my_json_format
  TYPE = JSON;

CREATE STAGE my_s3_stage
  STORAGE_INTEGRATION = s3_data
  URL = '---'
  FILE_FORMAT = my_json_format;


  show stages;



COPY INTO AMAZON.RAW.REVIEWS
  FROM @MY_S3_STAGE

     PATTERN='.*part.*.json'
     MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE;

     select count(*)
     from AMAZON.RAW.REVIEWS;


     select overall,count(*)
     from AMAZON.RAW.REVIEWS
     group by 1;


     





;
select *, DATE_TRUNC(month, to_timestamp(UNIXREVIEWTIME)) AS first_day_of_month
from AMAZON.RAW.REVIEWS
limit 500;

select DATE_TRUNC(month, to_timestamp(UNIXREVIEWTIME)) AS first_day_of_month,avg(overall)
from AMAZON.RAW.REVIEWS
group by 1







