const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);
