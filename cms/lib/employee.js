const connection = require('./connection.js');

class Employee {
  view() {
    return new Promise((resolve, reject) => {
      connection().query(
        'SELECT * FROM `employee`',
        function(err, results) {
          if (err) {
            reject(err);
          }

          console.table(results.map(item => ({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            role_id: item.role_id,
            manager_id: item.manager_id
          })));
          resolve();
        }
      );
    })
  }
}

module.exports = Employee;
