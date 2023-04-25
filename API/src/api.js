const express = require("express");

const api = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./routes");

api.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: process.env.MONGODB_DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database !\n");
  })
  .catch((err) => {
    console.log("Connection failed to the database.", err);
  });
mongoose.set("strictQuery", true);

api.use("/API.FindFreelance/v1", apiRouter);

api.listen(process.env.API_PORT, (err) => {
  if (err) {
    console.log("There is an issue with the Api : ",err);
  }
  console.log(
    `\n----------------------------------------\n API Freelancer is running on port ${process.env.API_PORT}\n----------------------------------------\n`
  );
});
