const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    password: String,
    email:  String
    });
module.exports = mongoose.model('login', loginSchema);
