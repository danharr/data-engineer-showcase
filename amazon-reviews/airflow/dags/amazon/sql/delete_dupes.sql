create or replace transient table AMAZON.RAW.duplicate_holder as (
    select asin, reviewerID, overall, unixReviewTime
    from AMAZON.RAW.FCT_DAILY_REVIEWS
    group by all
    having count(*)>1
);



delete from AMAZON.RAW.FCT_DAILY_REVIEWS a
using AMAZON.RAW.duplicate_holder b
where (a.asin,a.reviewerID,a.overall, a.unixReviewTime)=(b.asin,b.reviewerID,b.overall, b.unixReviewTime);