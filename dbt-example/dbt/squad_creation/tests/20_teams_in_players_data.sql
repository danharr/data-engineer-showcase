select * from (
select count(distinct club) as num
from {{ref('players_cleaned')}})
where num <> 20