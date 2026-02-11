SELECT *
FROM EMPP
    INNER JOIN DEP ON EMPP.department_id = DEP.department_id;

SELECT * FROM DEP;

SELECT * FROM EMPP;

SELECT *
FROM EMPP e
    JOIN DEP d ON e.department_id = d.department_id
    ;





    SELECT e.name, d.department_name
FROM EMPP e
    LEFT JOIN DEP d ON e.department_id = d.department_id

UNION

SELECT e.name, d.department_name
FROM EMPP e
    RIGHT JOIN DEP d ON e.department_id = d.department_id;



    SELECT e.name, d.department_name
FROM EMPP e
    CROSS JOIN DEP d;