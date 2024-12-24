const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

router.get('/',authMiddleware, getTasks);
router.post('/', authMiddleware,createTask);
router.put('/:id', authMiddleware,updateTask);
router.delete('/:id', authMiddleware,deleteTask);
router.get('/:id', authMiddleware,getTaskById);

module.exports = router;
