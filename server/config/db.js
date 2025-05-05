const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env.MONGO_URI
   await mongoose.connect("mongodb+srv://adhilsalahhk:Trendy12345@cluster0.gye2dny.mongodb.net/TrendyBazarr?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
