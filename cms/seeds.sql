CREATE DATABASE cms;

USE cms;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10, 2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE RESTRICT
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE RESTRICT,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
