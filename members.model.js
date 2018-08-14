const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    id: String,
    email:String
    });
module.exports = mongoose.model('member', TaskSchema);
