// Import the Express framework.
const express = require("express");
// Import our custom authentication middleware to protect routes.
const { protect } = require("../middleware/authMiddleware");

// Import the controller functions that contain the logic for each route.
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
// Import the configured multer middleware for handling file uploads.
const upload = require("../middleware/uploadMiddleware");

// Create a new router instance from Express.
const router = express.Router();

// --- Route Definitions ---

// Define a POST route for user registration. The `registerUser` controller will handle the request.
router.post("/register", registerUser);

// Define a POST route for user login. The `loginUser` controller will handle the request.
router.post("/login", loginUser);

// Define a GET route to fetch the authenticated user's information.
// This route is protected by the `protect` middleware.
// When a request hits this endpoint:
// 1. The `protect` middleware runs first to verify the JWT.
// 2. If the token is valid, it passes control to the `getUserInfo` controller.
router.get("/getUser", protect, getUserInfo);

// Define a POST route for uploading a profile image.
// It uses two middleware functions in sequence.
router.post(
  "/upload-image",
  // 1. `upload.single("image")`: The multer middleware processes the incoming request.
  //    It looks for a single file in a form field named "image", saves it,
  //    and attaches the file's information to the `req` object as `req.file`.
  upload.single("image"),
  // 2. The inline controller function runs after multer is finished.
  (req, res) => {
    // If no file was processed by multer, send an error.
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Construct the full, publicly accessible URL for the uploaded image.
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    // Send a success response with the image URL.
    res.status(200).json({ imageUrl });
  }
);

// Export the configured router so it can be used in the main server file.
module.exports = router;
