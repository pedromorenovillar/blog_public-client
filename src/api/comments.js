const API_URL = import.meta.env.VITE_API_URL;

export async function addComment(postId, content, token) {
  const body = { postId, content };
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}
