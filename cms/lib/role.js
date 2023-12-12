const inquirer = require('inquirer');
const connection = require('./connection.js');
const Department = require('./department.js');

class Role {
  view() {
    return new Promise((resolve, reject) => {
      connection().query(
        'SELECT * FROM `role`',
        function(err, results) {
          if (err) {
            reject(err);
          }

          console.table(results.map(item => ({
            id: item.id,
            title: item.title,
            salary: item.salary,
          })));
          resolve();
        }
      );
    })
  }

  add() {
    const department = new Department();

    return new Promise((resolve, reject) => {
      department.getData().then((data) => {
        const questions = [
          {
            name: 'title',
            message: 'Title: ',
            type: 'input',
            validate: (text) => {
              if (text.length > 30) {
                return 'Title can have maximum 30 characters';
              }
    
              if (!text.length) {
                return 'Please insert the title';
              }
          
              return true;
            },
          },
          {
            name: 'salary',
            message: 'Salary: ',
            type: 'number',
          },
          {
            name: 'department_id',
            type: 'list',
            message: 'Department: ',
            choices: data.map((item) => ({
              name: item.name,
              value: item.id
            })),
          },
        ];

        inquirer
        .prompt(questions)
        .then((answers) => {
          connection().query(
            'INSERT INTO `role` (`title`, `salary`, `department_id`) VALUES (' +
            '"'+ answers.title.replace(/\"/g, "\\\"") + '",' +
            '"'+ answers.salary + '",' +
            '"'+ answers.department_id + '"' +
            ')',
            function(err, results) {
              if (err) {
                reject(err);
              }

              console.log('Added role');
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
  }
}

module.exports = Role;
