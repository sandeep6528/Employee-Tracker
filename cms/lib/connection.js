const mysql = require('mysql2');

const connection = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cms'
  });
}

module.exports = connection;
