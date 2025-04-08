const taskService = require('./service');

exports.getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskService.getTasksByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const updatedTask = await taskService.updateTaskStatus(taskId, status);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task status', error });
    }
};
