const mongoose = require("mongoose");
const express= require("express");

const { MONGO_URI } = process.env;

exports.connect = () => {
    "mongodb+srv:Haroonshahzada:Shahzada444@cluster0.ny69e.mongodb.net/"
  mongoose
    .connect(MONGO_URI, {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("database connection failed");
      console.error(error);
      process.exit(1);
    });
};