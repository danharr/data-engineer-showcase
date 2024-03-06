# innovation-dbt

python3 -m venv dbt-env 
source dbt-env/bin/activate 
# in bash profile
alias env_dbt='source /Users/dharring/Documents/github/innovation-dbt/dbt-env/bin/activate'

python -m pip install dbt-snowflake
dbt --version

//1.7.4

dbt init 