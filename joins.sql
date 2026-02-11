show tables;


create table students(
    id int PRIMARY KEY,
    name varchar(50),
    dept VARCHAR(10)
)


create table marks(
    student_id int,
    subject VARCHAR(20),
    marks int
)
-- inserting values



INSERT INTO
    students (id, name, dept)
VALUES (1, 'Ravi Kumar', 'CSE'),
    (2, 'Priya Reddy', 'CSE'),
    (3, 'Anil Singh', 'ECE'),
    (4, 'Sita Devi', 'ECE'),
    (5, 'Mohan Rao', 'MECH'),
    (6, 'Lakshmi N', 'MECH');

INSERT INTO
    marks (student_id, subject, marks)
VALUES (1, 'DBMS', 85),
    (1, 'OS', 92),
    (2, 'DBMS', 78),
    (2, 'OS', 88),
    (3, 'Signals', 76),
    (3, 'Networks', 82),
    (4, 'Signals', 89),
    (4, 'Networks', 94),
    (5, 'Thermodynamics', 81),
    (5, 'Mechanics', 87),
    (6, 'Thermodynamics', 93),
    (6, 'Mechanics', 79);


select * from students;
select * from marks;

select   count(id) as no_of_students_in_dept, dept
 from students GROUP BY dept;


-- where is used toa pply condition on rows 
-- groupd by + having is used to apply condition on groups
select subject, count(*), avg(marks) from marks group by 
subject having avg(marks) > 85 ;

-- group by marks and students 










-- joins 

-- joins are used to combine rows from two or more 
-- tables based on a related column between them
-- types in joins 
-- inner join
-- left join
-- right join
-- full outer join
-- self join 

-- inner join on students and marks on id and student_id

select s.id , m.student_id, m.marks from students s 

inner  join 

 marks m on s.id = m .student_id;


-- left join on students and marks on id and student_id
-- left join returns all records from the left table (students), 
-- and the matched records from the right table (marks). 
-- If there is no match, the
insert into  students values(7, 'Ramesh', 'CSE');
insert into marks values(8, 'DBMS', 90);


SELECT *
from students s
    LEFT  JOIN marks m ON s.id = m.student_id

    UNION 
SELECT * from students s
    right JOIN marks m ON s.id = m.student_id; 


-- FULL OUTER JOIN IN SQL 
-- USES UNION KEYWORD

SELECT * FROM students s
    FULL OUTER JOIN marks m ON s.id = m.student_id;







-- SELF JOIN IN SQL 
-- A self join is a regular join, but the table is joined with itself.

SELECT * FROM students s1
    JOIN students s2 ON s1.dept = s2.dept;

-- cross join 
select from students s
CROSS JOIN marks m LIMIT 10;

-- GROUPDS + JOINS -- AGGREGATE FUNCTIONS WITH JOINS
-- update deelte drop truncate , where , group by , 
-- having with joins , table creations db creations , insertions ,
--  where + aggregate functions







select 





CREATE TABLE departments (
    dept_code VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(50)
);

INSERT INTO
    departments
VALUES ('CSE', 'Computer Science'),
    ('ECE', 'Electronics'),
    ('MECH', 'Mechanical');

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT
);

INSERT INTO
    employees
VALUES (1, 'Ravi', NULL),
    (2, 'Anu', 1),
    (3, 'Mohan', 1),
    (4, 'Kiran', 2);






show tables;






-- select *  each tables 
select * from students;
select * from marks;
select * from departments;
select * from employees;






-- all joins using students and marks with id and student_id
SELECT *
FROM students s
    right join marks m on s.id = m.student_id
     union all 
SELECT *
FROM students s
    left join marks m on s.id = m.student_id;





-- self join employees to get emp and their manager name*
FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.emp_id;







-- self join for employees to get emp and their manager
select * 
FROM employees e
    RIGHT JOIN employees m ON e.manager_id = m.emp_id;







select * from students s 
LEFT join marks m on s.id = m.student_id WHERE m.marks > 85;

select count(*) ,m.subject from students s 
right join marks m on s.id = m.student_id GROUP BY subject; 

select COUNT(*),d.dept_name from  students s
RIGHT JOIN departments d ON s.dept = d.dept_code GROUP BY d.dept_name HAVING dept_name = 'Computer Science';