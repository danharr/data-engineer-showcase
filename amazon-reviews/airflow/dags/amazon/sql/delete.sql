DELETE FROM AMAZON.RAW.FCT_DAILY_REVIEWS
where
etl_id = '{{ run_id }}';