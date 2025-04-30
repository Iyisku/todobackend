const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../Controllers/todoControllers');


// Middleware for authentication
// This middleware checks if the user is authenticated before allowing access to the routes
const protect = require('../middlewares/authMiddleware');


// Todo Routes
// These routes are protected by the 'protect' middleware, which checks if the user is authenticated
router.get('/getTodos', protect, getTodos);
router.post('/addTodo', protect, addTodo);
router.put('/updateTodo/:id', protect, updateTodo);
router.delete('/deleteTodo/:id', protect, deleteTodo);

module.exports = router;
