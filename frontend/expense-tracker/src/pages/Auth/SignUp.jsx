import React, { useContext, useState } from "react";
// Import layout, navigation, and UI components
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "./../../components/Inputs/Input";
import ProfilePhotoSelector from "./../../components/Inputs/ProfilePhotoSelector";
// Import utilities, context, and helpers
import { validateEmail } from "./../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  // State to manage form inputs. `profilePic` stores the file object.
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to display validation or API errors to the user.
  const [error, setError] = useState(null);

  // Access the updateUser function from the global context to set user state after successful signup.
  const { updateUser } = useContext(UserContext);

  // Hook for programmatic navigation (e.g., redirecting to the dashboard).
  const navigate = useNavigate();

  /**
   * Handles the form submission for creating a new account.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSignUp = async (e) => {
    // Prevent the default form behavior which reloads the page.
    e.preventDefault();
    let profileImageUrl = "";

    // --- Client-Side Validation ---
    if (!fullName) {
      setError("Please enter your name");
      return; // Stop execution if validation fails.
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    // Clear any previous errors before proceeding.
    setError("");

    // --- API Call Logic ---
    try {
      // First, check if a profile picture was selected.
      if (profilePic) {
        // If yes, call the dedicated image upload utility.
        const imgUploadRes = await uploadImage(profilePic);
        // Store the returned URL for the registration payload.
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      // Second, make the main registration API call with all user data.
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl, // Include the image URL (or an empty string if no image was uploaded).
      });
      // Destructure the token and user object from the successful response.
      const { token, user } = response.data;

      // --- Post-Registration Actions ---
      if (token) {
        // Store the authentication token in localStorage to keep the user logged in.
        localStorage.setItem("token", token);
        // Update the global user state.
        updateUser(user);
        // Redirect the user to the main dashboard.
        navigate("/dashboard");
      }
    } catch (error) {
      // --- Error Handling ---
      // Prioritize showing a specific error message from the server.
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        // Otherwise, show a generic error for network issues, etc.
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          {/* Component for selecting and previewing a profile picture. */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
              className="w-full"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
              className="w-full"
            />
            {/* This div spans both columns on larger screens for a full-width password input. */}
            <div className="col-span-1 sm:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
                className="w-full"
              />
            </div>
          </div>

          {/* Conditionally render the error message. */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;