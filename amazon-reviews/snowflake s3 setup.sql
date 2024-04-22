--aws s3 setup

-- Create our three tables and import the data from S3
CREATE OR REPLACE TABLE reviews
                    (reviewerID varchar,
                     asin varchar,
                     overall integer,
                     unixReviewTime string);

CREATE OR REPLACE TABLE categories
                    (asin varchar,
                     category varchar);

        
CREATE OR REPLACE TABLE reviews_full
                    (reviewerID varchar,
                     asin varchar,
                     overall integer,
                     reviewerName varchar,
                     reviewText varchar,
                     summary varchar,
                     unixReviewTime string);

CREATE STORAGE INTEGRATION s3_data
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::***:role/snowflakerole'
  STORAGE_ALLOWED_LOCATIONS = ('s3://amazon-reviews-samples/json/');


  CREATE OR REPLACE FILE FORMAT my_json_format
  TYPE = JSON;

CREATE OR REPLACE FILE FORMAT my_gz_format
  TYPE = JSON
  COMPRESSION =  GZIP ;



  CREATE STAGE my_s3_stage
  STORAGE_INTEGRATION = s3_data
  URL = 's3://amazon-reviews-samples/json/'
  FILE_FORMAT = my_json_format;


  CREATE STAGE my_s3_stage_gz
  STORAGE_INTEGRATION = s3_data
  URL = 's3://amazon-reviews-samples/json/'
  FILE_FORMAT = my_gz_format;


  COPY INTO AMAZON.RAW.REVIEWS
  FROM @MY_S3_STAGE

     PATTERN='.*part.*.json'
     MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE;


COPY INTO AMAZON.RAW.REVIEWS_FULL 
FROM @my_s3_stage_gz
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
FILE_FORMAT = my_json_format  ON_ERROR = 'SKIP_FILE' 
FILES = ('full-data-reviews.json.gz');


  

  
                     