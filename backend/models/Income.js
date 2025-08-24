// Import the Mongoose library.
const mongoose = require("mongoose");

// Create a new Mongoose schema for an Income record.
const IncomeSchema = new mongoose.Schema(
  // --- 1. Schema Definition (The fields of the document) ---
  {
    // A reference to the User who this income belongs to.
    userId: {
      type: mongoose.Schema.Types.ObjectId, // The data type is a MongoDB ObjectId.
      ref: "User", // This creates a relationship to the "User" model.
      required: true, // This field is mandatory.
    },
    // An optional URL for an icon.
    icon: { type: String },
    // The source of the income (e.g., "Salary", "Freelance").
    source: { type: String, required: true },
    // The amount of the income.
    amount: { type: Number, required: true },
    // The date the income was received.
    date: {
      type: Date,
      default: Date.now, // If no date is provided, it defaults to the current date and time.
    },
  },
  // --- 2. Schema Options ---
  {
    // The `timestamps: true` option tells Mongoose to automatically add two fields:
    // `createdAt`: a timestamp for when the document was created.
    // `updatedAt`: a timestamp for when the document was last updated.
    timestamps: true,
  }
);

/**
 * 3. Compile the schema into a model and export it.
 * A model is a constructor that provides an interface for interacting with the database collection.
 * The first argument, "Income", is the singular name of the model. Mongoose will automatically
 * look for a collection named "incomes" (plural, lowercase) in the MongoDB database.
 */
module.exports = mongoose.model("Income", IncomeSchema);
