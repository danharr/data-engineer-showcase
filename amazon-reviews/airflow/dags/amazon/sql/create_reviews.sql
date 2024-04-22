CREATE TABLE if not exists AMAZON.RAW.FCT_DAILY_REVIEWS
                    (reviewerID varchar,
                     asin varchar,
                     overall integer,
                     unixReviewTime string,
                     reviewerName varchar,
                     summary varchar,
                     reviewText varchar,
                     etl_id string);

