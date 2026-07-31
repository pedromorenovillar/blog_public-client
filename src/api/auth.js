// login(credentials)
// logout()
// getCurrentUser() (GET /users/me)
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
