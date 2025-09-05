const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// Create task
router.post('/', auth, async (req, res) => {
    try {
        const { title, priority, dueDate } = req.body;
        const task = new Task({ user: req.user.id, title, priority, dueDate });
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get tasks for user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update task
router.put('/:id', auth, async (req, res) => {
    try {
        const updates = req.body;
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        task = await Task.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
