
from __future__ import annotations

import os
from datetime import datetime

from airflow import DAG
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator, SnowflakeSqlApiOperator

SNOWFLAKE_CONN_ID = "snowflake_trial"
SNOWFLAKE_SAMPLE_TABLE = "sample_table"



DAG_ID = "amazon_daily_ingest"


with DAG(
    DAG_ID,
    start_date=datetime(2024, 3, 1),
    default_args={"snowflake_conn_id": SNOWFLAKE_CONN_ID},
    tags=["amazon"],
    schedule="@once",
    catchup=False,
) as dag:

    create_table = SnowflakeOperator(
        task_id="create_table",
        sql='sql/create_table.sql'
    )

    create_reviews = SnowflakeOperator(
        task_id="create_reviews",
        sql='sql/create_reviews.sql'
    )

    ingest_data = SnowflakeOperator(
        task_id="ingest_data_from_aws_s3",
        sql='sql/stage_data.sql'
    )

    delete = SnowflakeOperator(
        task_id="delete",
        sql='sql/delete.sql'
    )

    insert = SnowflakeOperator(
        task_id="insert",
        sql='sql/insert.sql'
    )

    show_dupes = SnowflakeOperator(
        task_id="show_dupes",
        sql='sql/show_dupes.sql'
    )

    delete_dupes = SnowflakeOperator(
        task_id="delete_dupes",
        sql='sql/delete_dupes.sql'
    )

    insert_single = SnowflakeOperator(
        task_id="insert_single",
        sql='sql/insert_single.sql'
    )

    [create_table , create_reviews] >> ingest_data >> delete >> insert >> show_dupes >> delete_dupes >> insert_single

