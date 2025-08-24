// Import the Mongoose library.
const mongoose = require("mongoose");
// Import the bcryptjs library for password hashing and comparison.
const bcryptjs = require("bcryptjs");

// Create a new Mongoose schema for a User.
const userSchema = new mongoose.Schema(
  // --- 1. Schema Definition (The fields of the document) ---
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // `unique: true` ensures no two users can have the same email.
    password: { type: String, required: true }, // This will store the hashed password, not the plain text.
    profileImageUrl: { type: String, default: null },
  },
  // --- 2. Schema Options ---
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields.
  }
);

/**
 * 3. Mongoose Middleware (Pre-Save Hook) for Password Hashing.
 * This function will automatically run *before* a user document is saved (`.save()`).
 */
userSchema.pre("save", async function (next) {
  // `this` refers to the user document being saved.
  // This check is an optimization: if the password has not been modified
  // (e.g., the user is just updating their email), we skip the hashing process.
  if (!this.isModified("password")) return next();

  // If the password is new or has been changed, we hash it.
  // `bcryptjs.hash` securely hashes the password. The second argument (10) is the
  // number of "salt rounds," which determines the complexity and security of the hash.
  this.password = await bcryptjs.hash(this.password, 10);

  // `next()` passes control to the next middleware or the final save operation.
  next();
});

/**
 * 4. Mongoose Instance Method for Password Comparison.
 * This adds a custom `comparePassword` method to every user document instance.
 * It's used to safely check if a password provided during login matches the stored hash.
 * @param {string} candidatePassword - The plain-text password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if passwords match, `false` otherwise.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  // `bcryptjs.compare` securely hashes the candidate password and compares it to the stored hash (`this.password`).
  // It returns a boolean result without ever needing to decrypt the stored password.
  return await bcryptjs.compare(candidatePassword, this.password);
};

/**
 * 5. Compile the schema into a model and export it.
 * The model provides the main interface for interacting with the "users" collection in MongoDB.
 */
module.exports = mongoose.model("User", userSchema);
