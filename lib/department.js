const connection = require('./connection.js');

class Department {
    view() {
        return new Promise((resolve, reject) => {
            connection().query(
                'SELECT * FROM `department`',
                function(err, results) {
                    if (err) {
                        reject(err);
                    }

                    console.table(results.map(item => ({
                        id: item.id,
                        name: item.name
                    })));
                    resolve();
                }
            );
        })
    }
}

module.exports = Department;
