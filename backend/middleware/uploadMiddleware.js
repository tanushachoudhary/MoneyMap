// Import the multer library.
const multer = require("multer");

/**
 * 1. Configure the storage engine.
 * `multer.diskStorage` tells multer to save the uploaded files to the server's disk.
 */
const storage = multer.diskStorage({
  /**
   * The `destination` function determines the folder where the uploaded files will be stored.
   * @param {object} req - The Express request object.
   * @param {object} file - The file object being uploaded.
   * @param {Function} cb - The callback function to complete the operation.
   */
  destination: (req, file, cb) => {
    // The first argument of the callback is for an error (null means success).
    // The second argument is the destination folder path.
    cb(null, "uploads/");
  },
  /**
   * The `filename` function determines the name of the file inside the destination folder.
   */
  filename: (req, file, cb) => {
    // To prevent filename conflicts (e.g., two users uploading "profile.jpg"),
    // we prepend the current timestamp to the original filename.
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * 2. Configure the file filter.
 * This function is used to control which files should be accepted and which should be rejected.
 */
const fileFilter = (req, file, cb) => {
  // Define an array of allowed MIME types for images.
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  // Check if the uploaded file's MIME type is in our allowed list.
  if (allowedTypes.includes(file.mimetype)) {
    // If the file type is allowed, call the callback with `true`.
    cb(null, true);
  } else {
    // If the file type is not allowed, call the callback with an error and `false`.
    cb(new Error("Only .jpeg, .jpg, and .png formats are allowed"), false);
  }
};

/**
 * 3. Initialize and configure the multer middleware.
 * We pass our custom storage and fileFilter configurations to it.
 */
const upload = multer({ storage, fileFilter });

// 4. Export the configured multer instance.
// This `upload` object can now be used as middleware in the application's routes to handle file uploads.
module.exports = upload;
