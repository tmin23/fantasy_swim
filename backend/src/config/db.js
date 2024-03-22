const mongoose = require("mongoose");

require("dotenv").config({path: "../../.env"});

const db =
  process.env.MONGO_URL;


console.log(db);

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;