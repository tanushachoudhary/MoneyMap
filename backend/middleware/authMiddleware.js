// Import the jsonwebtoken library to verify the token.
const jwt = require("jsonwebtoken");
// Import the User model to fetch user details from the database.
const User = require("../models/User");

/**
 * An authentication middleware to protect routes.
 * It verifies a JWT from the request headers and attaches the user's data to the request object.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
exports.protect = async (req, res, next) => {
  let token;

  // 1. Extract the token from the 'Authorization' header.
  // The header is expected to be in the format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Split the header string by the space and take the second part, which is the token itself.
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token is found, send a 401 (Unauthorized) error and stop.
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // 2. Verify the token.
    // `jwt.verify` decodes the token and checks if the signature is valid using the secret key.
    // If the token is invalid or expired, it will throw an error, which will be caught by the `catch` block.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch the user and attach it to the request object.
    // Use the ID from the decoded token's payload to find the user in the database.
    // `.select("-password")` is a security measure to exclude the user's hashed password from the result.
    req.user = await User.findById(decoded.id).select("-password");

    // 4. Proceed to the next middleware or route handler.
    // If everything is successful, `next()` passes control to the next function in the chain.
    next();
  } catch (error) {
    // If `jwt.verify` fails, send a 401 (Unauthorized) error.
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
