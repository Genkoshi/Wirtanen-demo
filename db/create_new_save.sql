insert into saves(user_id, save_load, time_stamped)
values ($1, $2, $3)
returning *;