const express = require("express");
const bodyParser = require("body-parser");
const dbCnfig = require("./config/db.config");
const mongoose = require("mongoose");

const userRouters = require("./src/routes/user.routes");
//create express app
const app = express();

//parese requests of content-type-application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse requests of content-type-application/json
app.use(bodyParser.json());

app.use("/api/users", userRouters);

//setup server port
const port = 4000;

//connection Database
mongoose
  .connect(dbCnfig.url)
  .then(() => {
    console.log("successufuly connected to database");
  })
  .catch((err) => {
    console.log("could not connect to the database ", err);
    process.exit();
  });

app.get("/test", (req, res) => {
  res.json({ message: "hello Nodejs" });
});

app.listen(port, () => {
  console.log(`Node server is running in port  ${port}`);
});
