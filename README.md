# data-engineer-showcase
playground for some data engineering projects

# projects

## latest data engineer jobs in London
This project gets data for data engineer jobs from LinkedIn, cwjobs etc and processes the data in airflow.  The cleaned data is then added to a Google Sheet which Tableau then visualises

This project uses an EC2 (AWS) instance to run the airflow tasks.  This is set on a schedule to minimise costs (if any).  So once a week, the EC2 instance will come alive and the airflow task will be able to run.  At the end of the final task the EC2 instance is shutdown

## football data hoarder
This project gets football scores data from various sites (BBC, premier league etc) and appends to tables in a Postgres data.  Airflow then creates different aggregations of the data (like current top scorer in the league).  The aggregated data is visualised in Tableau Public
