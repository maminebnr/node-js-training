const express = require("express");

const router = express.Router();

const userContoller = require("../controllers/user.controllers");

//create a new user
router.post("/create", userContoller.create);

//get list of users
router.get("/all", userContoller.findAll);

//get user by id 
router.get("/:id", userContoller.findById);

//delete user
router.delete("/:id", userContoller.delete);

//update user 
router.put("/:id", userContoller.update);


module.exports = router;
