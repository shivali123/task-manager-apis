const Profile = require('../model/profile.model.js');
const Login = require('../model/login.model.js')
const mongoose = require('mongoose');
const userModel = mongoose.model('Profile')

// Create and Save a new Profile
exports.create = (req, res) => {
  // Validate request
  // var me = this;
  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      return res.status(400).send({
                message: "email found",
                parameter:req.body.email
            });

    } else {
      if(!req.body.name) {
          return res.status(400).send({
              message: "name  can not be empty",
              parameter:req.body.name
          });
      }
      if(!req.body.email) {
          return res.status(400).send({
              message: "email can not be empty"
          });
      }
      // Create a Profile
      const note = new Profile({
          name: req.body.name || "Unnamed Profile",
          description: req.body.description,
          email:req.body.email,
          number:req.body.number,
          city:req.body.city,
          password:req.body.password
      });
      const login = new Login({
          email:req.body.email,
          password:req.body.password
      });
      // Save Profile in the database
      login.save()
      note.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Profile."
          });
      });
  }
})
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Profile.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Profile.findById(req.params.taskId)
      .then(note => {
          if(!note) {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.taskId
              });
          }
          res.send(note);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.taskId
              });
          }
          return res.status(500).send({
              message: "Error retrieving note with id " + req.params.taskId
          });
      });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
      if(!req.body.name && !req.body.email) {
          return res.status(400).send({
              message: "Profile name and email can not be empty"
          });
      }

      // Find note and update it with the request body
      Profile.findByIdAndUpdate(req.params.noteId, {
          name: req.body.name || "Unnamed Profile",
          description: req.body.description,
          email:req.body.email,
          number:req.body.number,
          city:req.body.city
      }, {new: true})
      .then(note => {
          if(!note) {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.noteId
              });
          }
          res.send(note);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.noteId
              });
          }
          return res.status(500).send({
              message: "Error updating note with id " + req.params.noteId
          });
      });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Profile.findByIdAndRemove(req.params.noteId)
      .then(note => {
          if(!note) {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.noteId
              });
          }
          res.send({message: "Profile deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.noteId
              });
          }
          return res.status(500).send({
              message: "Could not delete note with id " + req.params.noteId
          });
      });
};
