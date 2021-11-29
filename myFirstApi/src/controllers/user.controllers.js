const User = require("../models/user.model");

//create and save  a new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    return res.status(400).send({
      message: "please complete all field ",
    });
  }
   //create a new User
   const user = new User({
    firstName: req.body.firstName,
    lasName: req.body.lasName,
    email: req.body.email,
    phone: req.body.phone,
    is_active: req.body.is_active,
    isVerified: req.body.isVerified,
  });
  //save use in Database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "something went wrong while creating new user",
        });
    });
};
