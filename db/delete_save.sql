delete from saves
where id = $1;
select * from saves
where user_id = $2
order by id;