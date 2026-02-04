const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 모든 할 일 가져오기
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 특정 할 일 가져오기
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: '할 일을 찾을 수 없습니다' });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 새 할 일 만들기
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      task: req.body.task,
      isComplete: req.body.isComplete || false,
    });
    const savedTodo = await todo.save();
    res.status(201).json({ success: true, data: savedTodo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 할 일 수정하기
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        isComplete: req.body.isComplete,
      },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ success: false, message: '할 일을 찾을 수 없습니다' });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 할 일 삭제하기
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: '할 일을 찾을 수 없습니다' });
    }
    res.json({ success: true, message: '할 일이 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
