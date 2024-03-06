SELECT manager,
TO_DATE(START_DATE, 'DD Mon, YYYY') AS start_dt,
case when END_DATE = 'Present' then current_date()  else TO_DATE(END_DATE, 'DD Mon, YYYY') end AS end_dt,
club
from {{ source('dev','managers') }} 


