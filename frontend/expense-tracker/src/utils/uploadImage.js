import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

/**
 * Uploads an image file to the server.
 * @param {File} imageFile - The image file object, typically from an <input type="file"> element.
 * @returns {Promise<Object>} - A promise that resolves with the response data from the server upon successful upload.
 * @throws {Error} - Throws an error if the API call fails, allowing the caller to handle it.
 */
const uploadImage = async (imageFile) => {
  // FormData is a standard web API used to construct a set of key/value pairs
  // representing form fields and their values, which can be sent using an HTTP request.
  // It's essential for sending files.
  const formData = new FormData();

  // Append the image file to the FormData object.
  // The key "image" is what the server will use to access the file.
  formData.append("image", imageFile);

  try {
    // Make an asynchronous POST request to the image upload endpoint.
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE, // The URL for the upload endpoint.
      formData, // The data payload, which is our FormData object.
      {
        // Configuration for the request.
        headers: {
          // Set the Content-Type header to 'multipart/form-data'.
          // This tells the server that the request body contains form data, including a file.
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // If the request is successful, return the data from the server's response.
    return response.data;
  } catch (error) {
    // If an error occurs during the upload, log it to the console for debugging.
    console.error("Error uploading the image:", error);
    // Re-throw the error so that the function that called 'uploadImage'
    // can catch it and handle it, for example, by showing a notification to the user.
    throw error;
  }
};

export default uploadImage;