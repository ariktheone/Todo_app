// backend/database.js

const { createPool,createConnection } = require('mysql');

// Create a connection pool
const pool = createPool({
  host: 'localhost',
  user: 'root',       // Your MySQL username
  password: '202550', // Your MySQL password
  database: 'todo_app',   // Your MySQL database name
  connectionLimit: 10
});
var connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '202550',});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
connection.query('CREATE DATABASE IF NOT EXISTS todo_app', (err) => {
  if (err) throw err;
  console.log('Database created');
});
connection.query('USE todo_app', (err) => {
  if (err) throw err;
  console.log('Using database');
});
connection.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, completed BOOLEAN NOT NULL DEFAULT 0)', (err) => {
  if (err) throw err;
  console.log('Table created');
});

  
// Export the pool for use in other files
module.exports = pool;
