import { useEffect, useState } from "react";
import { getPublishedPosts } from "../api/posts";
import PostCard from "../components/posts/PostCard";
import Spinner from "../components/common/Spinner";

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
        <Spinner size={100} />
      ) : (
        <ul>
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </ul>
      )}
      {!loading && posts.length === 0 && <h2>There are no published blog posts.</h2>}
    </>
  );
}

export default Posts;
