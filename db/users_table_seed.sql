create table if not exists users (
    id serial primary key,
    user_name varchar(200),
    auth_id text
);