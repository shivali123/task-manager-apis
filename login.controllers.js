const Login = require('../model/login.model.js');
const mongoose = require('mongoose');

//field with 1 is returned while with 0 is not returned , by default _id is returned

exports.findOne = (req, res) => {
 console.log(req.params.email)
  // in any api fields inside find function is accessed
  Login.find({email:req.params.email})
      .then(login => {
          if(!login) {
              return res.status(404).send({
                  message: "Profile not found with id " + req.params.taskId
              });
          }
          res.send(login);
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
exports.findAll = (req, res) => {
  Login.find()
    .then(login => {
        res.send(login);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
