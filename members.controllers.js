const Profile = require('../model/profile.model.js');
const mongoose = require('mongoose');
const userModel = mongoose.model('Profile')

//field with 1 is returned while with 0 is not returned , by default _id is returned

exports.findAll = (req, res) => {
  Profile.find({}, {email:1, _id:0})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
