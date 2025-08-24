// Import the Express framework.
const express = require("express");
// Import the custom authentication middleware to protect the route.
const { protect } = require("../middleware/authMiddleware");
// Import the controller function that contains the logic for this route.
const { getDashboardData } = require("../controllers/dashboardController");

// Create a new router instance from Express.
const router = express.Router();

// Define a GET route for the dashboard.
// This route is protected by the `protect` middleware.
// When a request hits this endpoint:
// 1. The `protect` middleware runs first to verify the user's JWT.
// 2. If the token is valid, it calls `next()`, and the request is passed to the `getDashboardData` controller.
router.get("/", protect, getDashboardData);

// Export the configured router so it can be mounted in the main server file.
module.exports = router;
