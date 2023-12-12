const inquirer = require('inquirer');
const connection = require('./connection.js');
const Role = require('./role.js');

class Employee {
  getData() {
    return new Promise((resolve, reject) => {
      connection().query(
        'SELECT * FROM `employee`',
        function(err, results) {
          if (err) {
            reject(err);
          }

          const data = results.map(item => ({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            role_id: item.role_id,
            manager_id: item.manager_id
          }));

          resolve(data);
        }
      );
    })
  }

  add() {
    const role = new Role();

    return new Promise((resolve, reject) => {
      role.getData().then((roles) => {
        const roleIds = roles.map((item) => ({
          name: item.title,
          value: item.id
        }));

        this.getData().then((managers) => {
          const managerIds = managers.map((item) => ({
            name: `${item.first_name} ${item.last_name}`,
            value: item.id
          }));

          const questions = [
            {
              name: 'first_name',
              message: 'First Name: ',
              type: 'input',
              validate: (text) => {
                if (text.length > 30) {
                  return 'First Name can have maximum 30 characters';
                }
      
                if (!text.length) {
                  return 'Please insert the First Name';
                }
            
                return true;
              },
            },
            {
              name: 'last_name',
              message: 'Last Name: ',
              type: 'input',
              validate: (text) => {
                if (text.length > 30) {
                  return 'Last Name can have maximum 30 characters';
                }
      
                if (!text.length) {
                  return 'Please insert the Last Name';
                }
            
                return true;
              },
            },
            {
              name: 'role_id',
              type: 'list',
              message: 'Role: ',
              choices: roleIds
            },
          ];

          if (managerIds.length) {
            questions.push({
              name: 'manager_id',
              type: 'list',
              message: 'Manager: ',
              choices: [
                {
                  name: '---',
                  value: null
                },
                ...managerIds
              ]
            });
          }

          inquirer
          .prompt(questions)
          .then((answers) => {
            let query = 'INSERT INTO `employee` (`first_name`, `last_name`, `role_id`';

            if (answers.manager_id) {
              query += answers.manager_id ? ', `manager_id`' : '';
            }
  
            query += ') VALUES (' +
              '"' + answers.first_name.replace(/\"/g, "\\\"") + '",' +
              '"' + answers.last_name.replace(/\"/g, "\\\"") + '",' +
              '"' + answers.role_id + '"';
  
            if (answers.manager_id) {
              query += answers.manager_id ? `, "${answers.manager_id}"` : '';
            }
  
            query += ')';

            connection().query(
              query,
              function(err, results) {
                if (err) {
                  reject(err);
                }

                console.log('Added employee');
                resolve();
              }
            );
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
        });
      });
    });
  }
}

module.exports = Employee;
