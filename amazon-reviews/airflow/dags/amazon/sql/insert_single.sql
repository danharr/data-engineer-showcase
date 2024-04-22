insert into AMAZON.RAW.FCT_DAILY_REVIEWS
select reviewerID ,
asin ,
overall ,
unixReviewTime ,
reviewerName ,
summary ,
reviewText,
 '{{ run_id }}'
from AMAZON.RAW.duplicate_holder;