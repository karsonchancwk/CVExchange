const mongoose = require("mongoose");
const DATABASE_ACCESS =
  "mongodb+srv://wingkinchancwk:n1tfYWLuJt9yZETu@cluster0.w6zbrhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_ACCESS);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
