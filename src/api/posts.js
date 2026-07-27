const API_URL = import.meta.env.VITE_API_URL; // <-- In Vite, environment variables are exposed through import.meta.env. Variables should start with VITE_

export async function getPublishedPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  console.log(response);
  return response.json();
}
