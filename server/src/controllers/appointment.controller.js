const db = require("../models");
const mongoose = require('mongoose');
const Appointment = db.appointments;

// Create and Save a new Appointment
exports.create = (req, res) => { 
      // Create an Appointment
      if(req && req.body && req.body.animal){
        const appointment = new Appointment({
          animal: req.body.animal,
          unix: req.body.unix,
          doc: req.body.doc,
          diagnostic: req.body.diagnostic,
          status: req.body.status
        });
      
        // Save Appointment in the database
        appointment
          .save(appointment)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Appointment."
            });
          });
      } else {
        res.status(500).send({
          message: "Should have at least name",
        })
      }
      
};

// Retrieve all Appointments from the database.
exports.findAll = (req, res) => {
    Appointment.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    });
};

// Find a single Appointment with an id
exports.findOne = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    Appointment.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Appointment with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Appointment with id=" + id });
      });
};

// Update a Appointment by the id in the request
exports.update = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    Appointment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found!`
          });
        } else res.send({ message: "Appointment was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Appointment with id=" + id
        });
      });
};

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    Appointment.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Appointment with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Appointment was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Appointment with id=" + id
        });
      });
};

// Delete all Appointments from the database.
exports.deleteAll = (req, res) => {
    Appointment.deleteMany().then(data => {
      res.send({
        message: "Appointments deleted!"
      })
    });
};
