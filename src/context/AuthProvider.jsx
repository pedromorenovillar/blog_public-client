import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

// Accept children to wrap app and return them later
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user; // converts Object to boolean

  // Consider wrapping fetchCurrentUser in useCallback later
  async function fetchCurrentUser(token) {
    const userResponse = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!userResponse.ok) {
      throw new Error("Failed to get user");
    }
    // userResponse is a Response object that needs parsing
    const userData = await userResponse.json();
    // Save user
    setUser(userData);
  }

  async function login(email, password) {
    // Send the request
    const loginResponse = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      credentials: "include", // For request that require refresh token
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
    await fetchCurrentUser(accessToken);
    return;
  }

  async function logout() {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      credentials: "include", // For request that require refresh token
    });
    if (!response.ok) {
      throw new Error("Failed to log out");
    }
    // Clear user
    setUser(null);
    // Clear accesToken
    setAccessToken(null);
    return;
  }

  useEffect(() => {
    async function restoreSession() {
      try {
        // Check if refresh token exists (by trying POST /users/token)
        const tokenResponse = await fetch(`${API_URL}/users/token`, {
          method: "POST",
          credentials: "include", // For request that require refresh token
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!tokenResponse.ok) {
          throw new Error("Failed to get refresh token");
        }
        // Get new access token
        // tokenResponse is a Response object that needs parsing
        const newToken = await tokenResponse.json();
        // Save token
        setAccessToken(newToken.accessToken);
        // Call /users/me
        await fetchCurrentUser(newToken.accessToken);
      } catch (error) {
        setUser(null);
        setAccessToken(null);
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// Login.
// Refresh the browser.
// Check if user is restored.
// Logout.
// Refresh again.
// Confirm you stay logged out.