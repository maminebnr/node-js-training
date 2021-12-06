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
      res.status(500).send({
        message: err.message || "something went wrong while creating new user",
      });
    });
};

exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "something wrong while getting list of users !!" });
    });
};

exports.findById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "user not found with this id " + req.params.id });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "Error getting user with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "could not found user with id !!" + req.params.id });
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "user not found with this id " + req.params.id });
      }
      res.send({ message: "user deleted successuflly " });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "Error getting user with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "could not delete user with is !!" + req.params.id });
    });
};

exports.update = (req, res) => {
  //validate request
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "please fill all required fields " });
  }

  User.findByIdAndUpdate(
    req.params.id,
    {
      fistName: req.body.firstName,
      lastName: req.body.lasName,
      email: req.body.email,
      phone: req.body.phone,
      is_active: req.body.is_active,
      is_Verivfied: req.body.isVerified,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "user not found " });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "Error getting user with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "could not delete user with is !!" + req.params.id });
    });
};
