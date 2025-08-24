import React, { useContext, useState } from "react";
// Import layout, navigation, and UI components
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "./../../components/Inputs/Input";
// Import utilities and context
import { validateEmail } from "./../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to hold and display any validation or API errors.
  const [error, setError] = useState(null);

  // Access the updateUser function from the global UserContext to update user state upon login.
  const { updateUser } = useContext(UserContext);

  // Hook from React Router for programmatic navigation (e.g., redirecting after login).
  const navigate = useNavigate();

  /**
   * Handles the form submission for user login.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleLogin = async (e) => {
    // Prevent the default browser action of reloading the page on form submission.
    e.preventDefault();

    // --- Client-Side Validation ---
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return; // Stop the function execution if validation fails.
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    // Clear any previous errors before making the API call.
    setError("");

    // --- API Call ---
    try {
      // Make a POST request to the login endpoint with user credentials.
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      // Destructure the token and user data from the successful response.
      const { token, user } = response.data;

      if (token) {
        // Store the token in localStorage for persistent authentication.
        localStorage.setItem("token", token);
        // Update the global user context with the logged-in user's information.
        updateUser(user);
        // Redirect the user to the main dashboard.
        navigate("/dashboard");
      }
    } catch (error) {
      // --- Error Handling ---
      // Check if the error has a response from the server with a specific message.
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        // Fallback for network errors or other unexpected issues.
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    // AuthLayout provides the common visual structure for login/signup pages.
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Welcome back</h3>
        <p className="text-[13px] text-slate-700 mt-[5px] mb-6">
          Enter your details to login
        </p>

        {/* The login form, with its submission handled by the handleLogin function. */}
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {/* Conditionally render the error message only if an error exists. */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            {/* Link component for client-side navigation to the signup page. */}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;