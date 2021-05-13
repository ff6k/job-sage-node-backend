const Profile = require("../models/profile.model.js");

// Create and Save a new Profile Data
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Profile
  const profile = new Profile({
    Contact_name: req.body.Contact_name,
    Bus_name: req.body.Bus_name,
    Bus_Addr1: req.body.Bus_Addr1,
    Bus_Addr2: req.body.Bus_Addr2,
    Bus_State: req.body.Bus_State,
    Bus_cntry: req.body.Bus_cntry,
    Bus_city_nm: req.body.Bus_city_nm,
    Bus_Zip: req.body.Bus_Zip,
    Bus_phone: req.body.Bus_phone,
    Aadhar_card: req.body.Aadhar_card,
    PAN_NO: req.body.PAN_NO,
    GST_NO: req.body.GST_NO,
    TIN_NO: req.body.TIN_NO,
    uid: req.body.uid,
    created_dt: new Date(),
    last_updated_dt: new Date(),
  });
  // Save Profile in the database
  Profile.create(profile, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user Profile.",
      });
    else res.send(data);
  });
};

// Find a single Profile with a customerId
exports.findOne = (req, res) => {
  Profile.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with uid ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Customer with uid " + req.params.customerId,
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Profile.updateById(
    req.params.customerId,
    new Profile(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Profile with uid ${req.params.customerId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Profile with uid " + req.params.customerId,
          });
        }
      } else res.send(data);
    }
  );
};
