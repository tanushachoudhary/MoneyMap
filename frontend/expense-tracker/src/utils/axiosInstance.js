import axios from "axios";

// Create a custom instance of Axios. This allows you to share a base configuration
// (like the base URL and headers) across all HTTP requests in your application.
const axiosInstance = axios.create({
  // The base URL that will be prepended to all request URLs.
  baseURL: "https://moneymap-backend-al1s.onrender.com",
  // The maximum time (in milliseconds) that a request can take before it's
  // automatically aborted. This prevents requests from hanging indefinitely.
  timeout: 10000,
  // Default headers that will be sent with every request.
  headers: {
    "Content-Type": "application/json", // Indicates the request body format is JSON.
    Accept: "application/json", // Indicates that the client prefers a JSON response.
  },
});

// Add a request interceptor.
// Interceptors allow you to run code or modify requests/responses globally
// before they are sent or after they are received.
axiosInstance.interceptors.request.use(
  // This function is called before any request is sent.
  (config) => {
    // Retrieve the access token from the browser's local storage.
    const accessToken = localStorage.getItem("token");
    // If a token exists, add it to the request's Authorization header.
    // The 'Bearer' scheme is a common standard for sending tokens.
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Return the modified config object for the request to proceed.
    return config;
  },
  // This function is called if an error occurs while setting up the request.
  (error) => {
    // The request setup fails, so we reject the promise to propagate the error.
    return Promise.reject(error);
  }
);

// Add a response interceptor.
// This runs for every response received from the server.
axiosInstance.interceptors.response.use(
  // This function is called for successful responses (e.g., status 2xx).
  (response) => {
    // Simply return the response object to the part of the code that made the request.
    return response;
  },
  // This function is called for error responses (e.g., status 4xx, 5xx).
  (error) => {
    // Handle common errors globally to avoid duplicating code.
    if (error.response) {
      // Check for a 401 Unauthorized status. This typically means the user's
      // session has expired or their token is invalid.
      if (error.response.status === 401) {
        // Redirect the user to the login page to re-authenticate.
        window.location.href = "/login";
      }
    } else if (error.code === "ECONNABORTED") {
      // This error occurs if the request times out based on the 'timeout' config.
      console.error("Request timeout. Please try again");
    }
    // For all other errors, reject the promise so they can be handled
    // by the specific `catch` block where the API call was made.
    return Promise.reject(error);
  }
);

export default axiosInstance;