// Load environment variables from a .env file into process.env.
// This should be at the very top to ensure all other files have access to these variables.
require("dotenv").config();

// Import necessary libraries and modules.
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Create an instance of the Express application.
const app = express();

// --- Middleware Setup ---

// Enable Cross-Origin Resource Sharing (CORS).
// This allows your frontend application (running on a different domain) to make requests to this backend.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Allow requests from the client URL in the .env file.
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods.
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed request headers.
  })
);

// This is a built-in middleware that parses incoming request bodies with JSON payloads.
// It makes `req.body` available with the parsed JSON data.
app.use(express.json());

// This middleware parses incoming requests with URL-encoded payloads (e.g., from HTML forms).
app.use(express.urlencoded({ extended: true }));

// --- Database Connection ---
// Call the function to connect to the MongoDB database.
connectDB();

// --- API Routes ---
// Mount the different route handlers to specific base paths.
// For example, any request to "/api/v1/auth/..." will be handled by the `authRoutes` router.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// --- Static File Serving ---
// This serves static files (like images) from the 'uploads' directory.
// For example, a request to "/uploads/my-image.png" will serve the file from the server's 'uploads' folder.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Start the Server ---
// Define the port to run the server on. It uses the port from the .env file or defaults to 5000.
const PORT = process.env.PORT || 5000;
// Start the server and make it listen for incoming connections on the specified port.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
