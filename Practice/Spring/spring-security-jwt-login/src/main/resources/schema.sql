create table if not exists sample
(
    id      bigint not null auto_increment,
    title   varchar(255),
    content varchar(255),
    primary key (id)
);

