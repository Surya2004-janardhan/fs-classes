-- what is sql :
-- interview defination


-- SQL stands for Structured Query Language 
-- and is used to communicate with databases.

--  relations vs non relations db

-- examples of realational db - mysql, postgresql, oracle, sql server
-- examples of non relational db - mongodb, cassandra, redis



-- Relational Database:
-- A relational database stores data in structured tables (rows and columns) with
--  fixed schemas and relationships defined using keys (e.g., SQL-based systems).


-- Non-Relational (NoSQL) Database:
-- A non-relational database stores data in flexible, schema-less formats (key-value, 
-- document, column, or graph) designed for scalability and unstructured data


-- It is the standard language for relational database management systems.
-- Mysql is a popular relational database management system (RDBMS) bt not database
-- - that uses SQL as its standard language for managing and manipulating databases.
--  and works with relational databases that 
-- store data in tables of rows and columns.​-- 

-- db - 2 types in general 
-- 1.realational -- realtions btw tables where data is
-- stored in rows and cols

-- 2. non relational --no strong realations ex : mongodb







-- SQL commands are grouped into 5 main types:
-- DDL- define + change -- create , alter, drop , truncate , rename - structure of db
--  , DML - manipulate -- insert delete update(add, remove, modify data)
-- , DQL - query --select,
--  DCL - control over data- grant, revoke , and 
-- TCL -control over transactions -- commit rollback savepoint.

-- Each group has a different purpose like defining structure, changing data, controlling access, etc.​

-- sql queries in mysql  using sql - some db 












show databases;


use kirandb;
create database kirandb;
create database srikanth;


show tables;









-- we are writng something
-- create database sql_classes; 

-- use sql_classes;
-- show tables;

-- comment on table `students` is 'employee master table';

-- show tables;

CREATE TABLE students (
-- col name , datatype , constraints

    id int  PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    branch VARCHAR(20)
);


DESCRIBE TABLE students;
select * from students;

INSERT INTO students VALUES
(1, 'Arun Kumar', 'CSE'),

(2, 'Priya Singh', 'ECE'),

(3, 'Ravi Patel', 'CSE'),

(4, 'Sneha Reddy', 'ME'),
(5, 'Vikram Joshi', 'ECE');

insert into students(id, name, branch) values ('324',23 , 'cse');
insert into students values (6, null, 'cse');
drop table students;


select name as full_name  from  students; 

select * from students where id > 2;

select count(name) as something from students; -- non null values 

select count(*) from students; -- only one argument

select id from students; 

-- as is used for alisa for a col name to be changed in the output

select round(avg(id),3) as average_id from students;

-- /avg, min , max, sum, count -- 1 argument only

-- select round(21.212211, 0);

select round(avg(id),0) from students;


--  round - 2 arguments , 2nd one is to tell how many decimal places to be rounded over



-- select email  from users where email = "kira@gmail.com";

-- select email from users where pass = user_sent_pass;


select name from students;
select name from students where name like '%reddy';













select id from students order by id desc LIMIT 1 OFFSET 1;










select * from students order by id desc;

select * from students order by id desc limit 2 offset 0;


-- order by takes 1 argument sorts by default asc , desc manual
--  limit - limits output data to certain rows only
--  offset skips certain rows 
--  like compares with the format of string given


select * from students where branch in ('cse', 'ece', 'me', 'aiml');

select * from students where  ;
-- where branch = 'cse' or branch ='me';-- 

-- between operators checks in bteweer values
--  in checks wheterh it is in the values it represented 


-- in vs exists -- in (s sgfs sf ) exist(s g s )
SELECT * FROM students 
WHERE EXISTS (SELECT 1 FROM students WHERE branch = 'CSE');