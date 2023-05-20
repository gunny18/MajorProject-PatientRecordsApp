const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DRIVER_URL);
    const db = mongoose.connections[0].db;
    const gridBucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "gridUploads",
    });
    return {
      db,
      gridBucket,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
