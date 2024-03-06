select a.*,b.manager
from {{ ref('players_cleaned') }} a
left join {{ ref('managers_cleaned') }} b 
on 
a.club = b.club and 
a.join_date >= b.start_dt and
a.join_date < b.end_dt
