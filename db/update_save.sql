update saves set save_load = $2
where id = $1
returning *;