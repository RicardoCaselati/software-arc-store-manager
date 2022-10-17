const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  // waitForConnections: MYSQL_WAIT_FOR_CONNECTIONS,
  // connectionLimit: MYSQL_CONNECTION_LIMIT,
  // queueLimit: MYSQL_QUEUE_LIMIT,
});

module.exports = connection;