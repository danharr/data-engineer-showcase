SELECT player,
case when join_date = '-' then null else TO_DATE(join_date, 'Mon DD, YYYY') end AS join_date,
club
from {{ source('dev','players') }} 


