SELECT player,
TO_DATE(join_date, 'Mon DD, YYYY') AS join_date,
club
from {{ source('dev','players') }} 


