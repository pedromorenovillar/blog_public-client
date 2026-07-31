// login(credentials)
// logout()
// refreshAccessToken() (POST /users/token)

const API_URL = import.meta.env.VITE_API_URL;

export async function register(user) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}

// TODO: maybe wrap fetchCurrentUser in useCallback
export async function fetchCurrentUser(token) {
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
  return userData;
}

