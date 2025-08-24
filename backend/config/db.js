// Import the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require("mongoose");

/**
 * An asynchronous function to connect to the MongoDB database.
 */
const connectDB = async () => {
  // Use a try...catch block to handle any potential connection errors.
  try {
    // Attempt to connect to the database using the connection string (URI)
    // stored in the environment variables for security.
    await mongoose.connect(process.env.MONGO_URI, {});

    // If the connection is successful, log a confirmation message to the console.
    console.log("MongoDB connected");
  } catch (err) {
    // If an error occurs during the connection attempt, log the error.
    console.error("Error connecting to MongoDB", err);

    // Exit the Node.js process with a failure code (1). This is a "fail-fast" approach,
    // ensuring the application doesn't continue to run in a broken state if the database is unavailable.
    process.exit(1);
  }
};

// Export the connectDB function so it can be imported and used in other files (e.g., the main server file).
module.exports = connectDB;
