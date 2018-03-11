select save_load from saves
where user_id = $1
order by time_stamped desc
limit 1;