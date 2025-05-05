// const mongoose = require("mongoose");
// const url =
//   "mongodb+srv://wiaambusiness28:3aWtJeOh3kxhmyJu@cluster0.zqolu1d.mongodb.net/blog";
// module.exports = async () => {
//   try {
//     mongoose.connect(url);
//     console.log("connected to database ^_^");
//   } catch (error) {
//     console.log("conection is faild", error);
//   }
// };

const mongoose = require("mongoose");

const url =
  "mongodb+srv://wiaambusiness28:3aWtJeOh3kxhmyJu@cluster0.zqolu1d.mongodb.net/blog?retryWrites=true&w=majority";

module.exports = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // زيادة المهلة لتفادي timeout
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Connection to MongoDB failed:", error.message);
  }
};
