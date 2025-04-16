const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://wiaambusiness28:3aWtJeOh3kxhmyJu@cluster0.zqolu1d.mongodb.net/blog"
    );
    console.log("connected to database ^_^");
  } catch (error) {
    console.log("conection is faild", error);
  }
};
