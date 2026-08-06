import { Link } from "react-router-dom"; // <- Client side nav without reloading
import styles from "./PostCard.module.css";

function PostCard({ post }) {
  return (
    <>
      <li className={styles.PostCard}>
        <Link to={`/posts/${post.id}/${post.slug}`}>
          <h2>
            {post.title} |
            <span>
              {post.author.firstname} {post.author.lastname} (
              {new Date(post.createdAt).toLocaleDateString()})
            </span>
          </h2>
          <div>
            {post.content.length > 50
              ? post.content.slice(0, 50) + "..."
              : post.content}
          </div>
        </Link>
      </li>
    </>
  );
}

export default PostCard;
