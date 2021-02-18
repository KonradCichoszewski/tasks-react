CREATE TABLE todos(
    id SERIAL PRIMARY KEY NOT NULL,
    todo TEXT NOT NULL,
    done BOOLEAN NOT NULL,
    user_email VARCHAR(70) REFERENCES users(email) NOT NULL
);

insert into todos (todo, done, user_email) values ('Synergized zero defect interface', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Optimized 5th generation toolset', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Robust didactic software', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Digitized tertiary help-desk', false, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Cross-platform global info-mediaries', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Balanced fresh-thinking support', false, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Multi-tiered motivating protocol', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Seamless incremental intranet', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Cloned zero defect hub', true, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Progressive national algorithm', false, 'ddoiley0@tripadvisor.com');
insert into todos (todo, done, user_email) values ('Monitored zero administration productivity', true, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Centralized 24/7 help-desk', true, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Sharable multimedia migration', true, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Customizable solution-oriented task-force', false, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Mandatory even-keeled moratorium', false, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Mandatory intangible Graphical User Interface', true, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Quality-focused asymmetric flexibility', true, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Automated encompassing encoding', false, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Down-sized intermediate frame', false, 'phumes1@wikia.com');
insert into todos (todo, done, user_email) values ('Intuitive intermediate attitude', true, 'phumes1@wikia.com');