const connection = require('./connection.js');

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
}

module.exports = Role;
