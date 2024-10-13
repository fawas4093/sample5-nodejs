const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = { id: todos.length + 1, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET a todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// PUT (update) a todo by ID
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  const { title, completed } = req.body;
  if (title) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  
  res.json(todo);
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Todo deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
