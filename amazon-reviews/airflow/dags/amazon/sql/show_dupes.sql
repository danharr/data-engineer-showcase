create or replace transient table AMAZON.RAW.duplicate_holder as (
    select  reviewerID, asin,overall, unixReviewTime,max(reviewerName) reviewerName, max(summary) summary , max(reviewText) reviewText , max(etl_id) etl_id
    from AMAZON.RAW.FCT_DAILY_REVIEWS
    group by 1,2,3,4
    having count(*)>1
);



                 