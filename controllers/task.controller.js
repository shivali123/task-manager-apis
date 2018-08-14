const Task = require('../model/task.model.js');
const mongoose = require('mongoose');
const taskModel = mongoose.model('task')

// Create and Save a new task
exports.create = (req, res) => {
  // Validate request
  // var me = this;
      if(!req.body.sender) {
          return res.status(400).send({
              message: "task  can not be empty",
              parameter:req.body.task
          });
      }
      if(!req.body.receiver) {
          return res.status(400).send({
              message: "description can not be empty"
          });
      }
      // Create a task
      const task = new Task({
        sender: req.body.sender || "Unnamed task",
        receiver: req.body.receiver,
        duration:req.body.duration,
        priority:req.body.priority,
        sendingTime:Date.now(),
        task: req.body.task
      });

      // Save task in the database
      task.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the task."
          });
      });
};
// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
  Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

// Find a single task with a taskid
//findMyTask
exports.findMyTask = (req, res) => {
  // console.log(req.params.taskId)
  // return;

  // in any api fileds inside find function is accessed
  Task.find({receiver:req.params.taskId})
      .then(task => {
          if(!task) {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          res.send(task);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          return res.status(500).send({
              message: "Error retrieving task with id " + req.params.taskId
          });
      });
};
exports.findOne = (req, res) => {
  // console.log(req.params.taskId)
  // return;

  // in any api fileds inside find function is accessed

  Task.find({sender:req.params.taskId})
      .then(task => {
          if(!task) {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          res.send(task);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          return res.status(500).send({
              message: "Error retrieving task with id " + req.params.taskId
          });
      });
};

// Update a task identified by the taskid in the request
exports.update = (req, res) => {
  // Validate Request
      if(!req.body.task && !req.body.description) {
          return res.status(400).send({
              message: "task name and email can not be empty"
          });
      }

      // Find task and update it with the request body
      Task.findByIdAndUpdate(req.params.taskId, {
        sender: req.body.sender || "Unnamed task",
        receiver: req.body.receiver,
        duration:req.body.duration,
        priority:req.body.priority,
        sendingTime:Date.now(),
        task:req.body.task
      }, {new: true})
      .then(task => {
          if(!task) {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          res.send(task);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          return res.status(500).send({
              message: "Error updating task with id " + req.params.taskId
          });
      });
};

// Delete a task with the specified taskid in the request
exports.delete = (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
      .then(task => {
          if(!task) {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          res.send({message: "task deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "task not found with id " + req.params.taskId
              });
          }
          return res.status(500).send({
              message: "Could not delete task with id " + req.params.taskId
          });
      });
};
