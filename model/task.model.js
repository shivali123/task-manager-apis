const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    sendingTime     : Date,
    receiver        : String,
    duration        : String,
    priority        : String,
    sender          : String,
    task            : String
  },{
    timestamps  : true
  });
module.exports = mongoose.model('task', TaskSchema);
