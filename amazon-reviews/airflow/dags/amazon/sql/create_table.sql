CREATE OR REPLACE TABLE AMAZON.RAW.daily_data_s3
                    (reviewerID varchar,
                     asin varchar,
                     overall integer,
                     reviewerName varchar,
                     reviewText varchar,
                     summary varchar,
                     unixReviewTime string);