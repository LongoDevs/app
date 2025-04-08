const express = require('express');
const router = express.Router();
const taskController = require('./controller');

router.get('/:userId', taskController.getUserTasks);
router.post('/', taskController.createTask);
router.put('/:taskId/status', taskController.updateTaskStatus);

module.exports = router;
