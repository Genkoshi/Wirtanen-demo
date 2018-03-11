create table if not exists saves (
    id serial primary key, 
    user_id integer references users(id), 
    save_load jsonb,
    time_stamped timestamp not null default current_timestamp
)
