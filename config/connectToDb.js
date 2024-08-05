const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect("mongodb+srv://weaam224112:lCau2U2euvvlfoPG@cluster0.0njgm21.mongodb.net/blog");
    console.log("connected to database ^_^");
  } catch (error) {
    console.log("conection is faild", error);
  }
};
