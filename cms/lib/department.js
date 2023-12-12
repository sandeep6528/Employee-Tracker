const inquirer = require('inquirer');
const connection = require('./connection.js');

class Department {
  getData() {
    return new Promise((resolve, reject) => {
      connection().query(
        'SELECT * FROM `department`',
        function(err, results) {
          if (err) {
            reject(err);
          }

          const data = results.map(item => ({
            id: item.id,
            name: item.name
          }));

          resolve(data);
        }
      );
    })
  }

  add() {
    const questions = [
      {
        name: 'name',
        message: 'Name: ',
        type: 'input',
        validate: (text) => {
          if (text.length > 30) {
            return 'Department name can have maximum 30 characters';
          }

          if (!text.length) {
            return 'Please insert department name';
          }
      
          return true;
        },
      },
    ];

    return new Promise((resolve, reject) => {
      inquirer
      .prompt(questions)
      .then((answers) => {
        connection().query(
          'INSERT INTO `department` (`name`) VALUES ("' + answers.name.replace(/\"/g, "\\\"") + '")',
          function(err, results) {
            if (err) {
              reject(err);
            }

            console.log('Added department');
            resolve();
          }
        );
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}

module.exports = Department;
