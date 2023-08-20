const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log(`mongo db connected ${connect.connection.host}`.yellow);
  } catch (error) {
    console.log(`error ${error.message}`.red);
    process.exit();
  }
};

module.exports = connectToDB;
