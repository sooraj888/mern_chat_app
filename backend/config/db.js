const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    console.log(String(process.env.MONGO_URI).yellow);
    const connect = await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log(`mongo db connected ${connect.connection.host}`.green);
  } catch (error) {
    console.log(`error ${error.message}`.red);
    process.exit();
  }
};

module.exports = connectToDB;
