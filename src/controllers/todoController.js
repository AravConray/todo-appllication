const Todo = require('../models/todo');
const mongoose = require('mongoose');
/** * @module todoController * Provides CRUD operations for Todo items. */ /** * Retrieve all Todo items. */ const getTodos =
  async (req, res) => {
    try {
      const todos = await Todo.find().exec();
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
/** * Retrieve a single Todo by ID. */ const getTodoById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid ID format' });
  }
  try {
    const todo = await Todo.findById(id).exec();
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
/** * Create a new Todo. */ const createTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }
  try {
    const todo = new Todo({ title, description, completed: !!completed });
    const saved = await todo.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
/** * Update an existing Todo. */ const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid ID format' });
  }
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true, runValidators: true }
    ).exec();
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
/** * Delete a Todo by ID. */ const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid ID format' });
  }
  try {
    const result = await Todo.findByIdAndDelete(id).exec();
    if (!result) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
