import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { register, fetchCurrentUser } from "../api/auth";

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
      credentials: "include", // For request that require refresh token
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // loginResponse is a Response object that needs parsing
    const data = await loginResponse.json();
    if (!loginResponse.ok) {
      throw data;
    }
    // Read the JSON
    const accessToken = data.accessToken;
    // Save the access token
    setAccessToken(accessToken);
    // Fetch user
    const currentUser = await fetchCurrentUser(accessToken);
    
    setUser(currentUser)
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
        // User not logged in
        if (tokenResponse.status === 401) {
          setUser(null);
          setAccessToken(null);
          return;
        }
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
        console.error(error);
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
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
