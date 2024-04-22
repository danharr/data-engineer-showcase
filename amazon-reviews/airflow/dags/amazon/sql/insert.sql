insert into  AMAZON.RAW.FCT_DAILY_REVIEWS
select 
reviewerID ,
                     asin ,
                     overall ,
                     unixReviewTime ,
                     reviewerName ,
                     summary ,
                     reviewText, 
                     '{{ run_id }}' etl_id
from AMAZON.RAW.daily_data_s3