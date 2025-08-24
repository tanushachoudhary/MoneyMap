// Import the User model to interact with the 'users' collection in MongoDB.
const User = require("../models/User");
// Import the jsonwebtoken library to create and manage JWTs.
const jwt = require("jsonwebtoken");

/**
 * A helper function to generate a JSON Web Token (JWT).
 * @param {string} id - The user's unique MongoDB ID to be included in the token's payload.
 * @returns {string} - The generated JWT.
 */
const generateToken = (id) => {
  // `jwt.sign` creates a new token.
  // The payload `{ id }` contains the user's ID.
  // `process.env.JWT_SECRET` is a secret key from environment variables, crucial for security.
  // `expiresIn: "1h"` sets the token to expire in 1 hour.
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Controller to handle new user registration.
 */
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // --- 1. Validation ---
  // Check if essential fields are provided in the request body.
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // --- 2. Check for Existing User ---
    // Search the database to see if a user with the given email already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // --- 3. Create New User ---
    // If the user doesn't exist, create a new user document in the database.
    // The password will be automatically hashed by a pre-save hook in the User model.
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // --- 4. Send Successful Response ---
    // Respond with a 201 (Created) status, the new user's data, and a JWT.
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    // --- 5. Error Handling ---
    // If any server-side error occurs, send a 500 (Internal Server Error) response.
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

/**
 * Controller to handle user login.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // --- 1. Validation ---
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // --- 2. Find User and Validate Password ---
    // Find the user by their email.
    const user = await User.findOne({ email });
    // If no user is found OR if the provided password doesn't match the stored hash
    // (checked via the `comparePassword` method in the User model), return an error.
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // --- 3. Send Successful Response ---
    // If credentials are valid, respond with the user's data and a new JWT.
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    // --- 4. Error Handling ---
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

/**
 * Controller to get the authenticated user's information.
 * This is a protected route that requires a valid JWT.
 */
exports.getUserInfo = async (req, res) => {
  try {
    // The user's ID is attached to the `req` object by the authentication middleware (e.g., `req.user.id`).
    // Find the user by their ID and exclude the password field from the result for security.
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's information.
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error getting user information",
      error: error.message,
    });
  }
};
