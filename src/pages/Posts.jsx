import { useEffect, useState } from "react";
import { getPublishedPosts } from "../api/posts";
import { Link } from "react-router-dom"; // <- Client side nav without reloading

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const publishedPosts = await getPublishedPosts();
        setPosts(publishedPosts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              {post.content.slice(0, 200)}
              {new Date(post.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Posts;
