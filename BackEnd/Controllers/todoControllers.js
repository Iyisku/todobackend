const Todo = require('../Models/TodoSchema');

// GET /getTodos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /addTodo
exports.addTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const newTodo = new Todo({
      userId: req.userId,
      title
    });

    await newTodo.save();
    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /updateTodo/:id
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, completed },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo updated', todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /deleteTodo/:id
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
