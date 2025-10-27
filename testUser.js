const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/users');
const Task = require('./models/tasks');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error', err.message);
        process.exit(1);
    });

(async () => {
    try {
        const testUser = new User({
            email: "user@testmail.com",
            password: "semi-solid-password", // Hash later, just for testing
            name: "John User",
            role: 'user',
        });
        await testUser.save();
        console.log("User created!");
        process.exit(0);
    } catch (err) {
        console.err(err);
        process.exit(1);
        }
})();

const userID = testUser._id;

(async () => {
    try {
        const sampleTask = new Task({
            owner: userID,
            status: 'pending',
            tags: ['test'],
        });
        await sampleTask.save();
        console.log("Task created!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();