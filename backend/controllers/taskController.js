const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user });
        console.log(req.params.id , req.user);
        if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createTask = async (req, res) => {
    const { name, description, dueDate } = req.body;
    try {
        console.log(req.user);
        const newTask = new Task({ name, description, dueDate, user: req.user });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user }, 
            req.body, 
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

