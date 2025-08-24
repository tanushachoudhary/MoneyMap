import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

/**
 * A custom hook to manage user authentication state.
 *
 * This hook should be called at the top of any component that requires an authenticated user.
 *
 * How it works:
 * 1. Checks if user data already exists in the `UserContext`. If so, it does nothing.
 * 2. If no user data is found, it makes an API call to a protected endpoint to fetch the user's information.
 * 3. If the fetch is successful, it updates the `UserContext` with the user's data.
 * 4. If the fetch fails (e.g., due to an invalid/expired token), it clears any user data and redirects to the login page.
 */
export const useUserAuth = () => {
  // Access the global user state and its updater functions from the context.
  const { user, updateUser, clearUser } = useContext(UserContext);
  // Get the navigate function from React Router for programmatic redirection.
  const navigate = useNavigate();

  // The useEffect hook runs when the component mounts and whenever its dependencies change.
  useEffect(() => {
    // If the user object already exists in our context, we don't need to do anything.
    // This prevents unnecessary API calls on every navigation within the app.
    if (user) return;

    // This flag helps prevent state updates on an unmounted component, which can cause memory leaks.
    let isMounted = true;

    /**
     * An async function to fetch the user's information from the server.
     * This relies on the JWT token being sent automatically by the axios interceptor.
     */
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        // Before updating state, check if the component is still mounted and if we received data.
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // If the component is still mounted, it means the user is unauthenticated.
        if (isMounted) {
          clearUser(); // Clear any stale user data.
          navigate("/login"); // Redirect to the login page.
        }
      }
    };

    // Call the function to fetch user data.
    fetchUserInfo();
    
    // --- Cleanup Function ---
    // This function is returned by useEffect and runs when the component unmounts.
    return () => {
      // Set the flag to false, so any pending async operations know not to update state.
      isMounted = false;
    };
    // Dependencies for the useEffect hook. It will re-run if any of these change.
  }, [user, updateUser, clearUser, navigate]);
};