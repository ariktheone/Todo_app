const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const pool = require('./database');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Basic Authentication Middleware
app.use(basicAuth({
  users: { 'root': '202550' }, 
  unauthorizedResponse: {message :'Go Back'}
}));

// Endpoint to get all tasks from the database
app.get('/tasks', (req, res) => {
  pool.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  pool.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: results.insertId, title, description });
    }
  );
});

// Endpoint to update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  pool.query(
    'UPDATE tasks SET completed = ? WHERE id = ?',
    [completed, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Task updated successfully' });
    }
  );
});

// Endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
