const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema = ({
    name: {
        type: String,
        default: 'New Task',
    },
    description: {
        type: String,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'complete', 'archived'],
        default: 'pending',
        required: true,
    },
    tags: {
        type: [String],
        lowercase: true,
    }
},
{
    timestamps: true
})