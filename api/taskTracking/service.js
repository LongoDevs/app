const Task = require('./model');

exports.getTasksByUser = async (userId) => {
    return await Task.find({ userId });
};

exports.createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();
};

exports.updateTaskStatus = async (taskId, status) => {
    return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
};
