COPY INTO AMAZON.RAW.daily_data_s3 
FROM @my_s3_stage_gz
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
FILE_FORMAT = my_json_format  ON_ERROR = 'SKIP_FILE' 
FILES = ('daily_data23042014.json.gz');