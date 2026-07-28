import { useState, createContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

// Accept children to wrap app and return them later
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user; // converts Object to boolean

  async function login(email, password) {
    // Send the request
    const loginResponse = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!loginResponse.ok) {
      throw new Error("Failed to log in");
    }
    // loginResponse is a Response object that needs parsing
    const data = await loginResponse.json();
    // Read the JSON
    const accessToken = data.accessToken;
    // Save the access token
    setAccessToken(accessToken);
    // Fetch user
    const userResponse = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!userResponse.ok) {
      throw new Error("Failed to get user");
    }
    // userResponse is a Response object that needs parsing
    const userData = await userResponse.json();
    // Save user
    setUser(userData);
    console.log("Fetched user:", userData);
    return;
  }

  async function logout() {
    const response = await fetch(`${API_URL}/users/logout`);
    if (!response.ok) {
      throw new Error("Failed to log out");
    }
    return response;
  }

  // useEffect
  // checks whether a refresh token cookie exists (by trying POST /users/token),
  // gets a new access token,
  // calls /users/me,
  // restores the session.

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        // loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
