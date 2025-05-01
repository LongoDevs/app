const express = require('express');
const router = express.Router();

// Import your task controller
const { getAllTasks, createTask, updateTaskStatus } = require('../controllers/taskTrackingController');

// Routes for task tracking
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id/status', updateTaskStatus);

module.exports = router;
