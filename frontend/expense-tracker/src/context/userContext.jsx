import React, { createContext, useState } from "react";

// 1. Create the Context
// This creates a new Context object. Components can subscribe to this context to read its value.
// It's exported so other components can use it with the `useContext` hook.
export const UserContext = createContext();

/**
 * 2. Create the Provider Component
 * This component will wrap parts of your application (or the entire app)
 * and provide the user data and functions to all components inside it.
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components that this provider will wrap.
 */
const UserProvider = ({ children }) => {
  // State to hold the current user's data. Initially null, meaning no user is logged in.
  const [user, setUser] = useState(null);

  /**
   * Function to update the user's data in the state.
   * This is typically called after a successful login or registration.
   * @param {object} userData - The user object received from the API.
   */
  const updateUser = (userData) => {
    setUser(userData);
  };

  /**
   * Function to clear the user's data from the state.
   * This is typically called on logout.
   */
  const clearUser = () => {
    setUser(null);
  };

  // 3. Provide the State and Functions to Children
  // The `UserContext.Provider` makes the `value` prop available to any descendant
  // component that subscribes to this context.
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {/* `children` represents whatever components are nested inside the UserProvider */}
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;