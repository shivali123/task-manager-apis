const mongoose = require('mongoose');

const ProifleSchema = mongoose.Schema({
    name: String,
    description: String,
    city:String,
    number:String,
    email:String,
    password:String
  },{
    timestamps: true
});
module.exports = mongoose.model('Profile', ProifleSchema);
