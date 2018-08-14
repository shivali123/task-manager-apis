module.exports = (app) => {
    const task = require('../controllers/task.controller.js');

    // Create a new task
    app.post('/task', task.create);

    // Retrieve all task
    app.get('/task', task.findAll);

    // Retrieve a single task with task
    app.get('/task/:taskId', task.findOne);

    app.get('/task/complete/:taskId', task.findMyTask);


    // Update a task with task
    app.put('/task/:taskId', task.update);

    // Delete a task with task
    app.delete('/task/:taskId', task.delete);
}
