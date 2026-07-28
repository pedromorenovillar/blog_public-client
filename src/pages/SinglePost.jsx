import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../api/posts";

function SinglePost() {
  const [post, setPost] = useState();
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    async function loadPost(id) {
      try {
        const post = await getSinglePost(id);
        setPost(post);
        document.title = post.title;
      } catch (error) {
        setError(error.message);
      }
    }
    loadPost(id);
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h2>
        {post.title} | {new Date(post.createdAt).toLocaleDateString()}
      </h2>
      <div>
        by {post.author.firstname} {post.author.lastname}
      </div>
      <h3>{post.content}</h3>
      <h4>Comments</h4>
      {post.comments.map((comment) => (
        <div key={comment.id}>
          <p>
            {comment.author.firstname}: {comment.content} |{" "}
            {new Date(comment.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </>
  );
}

export default SinglePost;
