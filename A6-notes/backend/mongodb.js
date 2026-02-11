const mongoose = require("mongoose");

const connectToMongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://fs-classes:fs-classes@fs-classes.w6glfk4.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected-- to mongodb");
  } catch (Err) {
    console.log(Err.message);
  }
};
module.exports = connectToMongodb;
