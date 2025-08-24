// Import the Express framework.
const express = require("express");

// Import the controller functions that contain the logic for each income-related action.
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController");

// Import the custom authentication middleware to protect the routes.
const { protect } = require("../middleware/authMiddleware");

// Create a new router instance from Express.
const router = express.Router();

// --- Route Definitions ---
// All routes defined here are protected, meaning the `protect` middleware will run first
// to verify the user's JWT before the controller function is executed.

// Define a POST route to add a new income record.
router.post("/add", protect, addIncome);

// Define a GET route to retrieve all income records for the logged-in user.
router.get("/get", protect, getAllIncome);

// Define a GET route to download all income data as an Excel file.
router.get("/downloadexcel", protect, downloadIncomeExcel);

// Define a DELETE route to remove a specific income record by its ID.
// The `:id` is a URL parameter that will be available in the controller as `req.params.id`.
router.delete("/:id", protect, deleteIncome);

// Export the configured router so it can be mounted in the main server file.
module.exports = router;
