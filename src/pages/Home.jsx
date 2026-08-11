import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="MainContent">
      {isAuthenticated ? <h1>Hello, {user.firstname}!</h1> : <h1>Home</h1>}
      {user?.isAuthor ? (
        <>
          <p>
            Welcome to the home page of the blog. Here you can view all
            published posts.
          </p>
          <p>
            As an author, you can manage your blog posts as well as add or
            delete comments to other author's posts on the Dashboard.
          </p>
          <p>Registered users that are not authors can comment on published posts, while anonymous users can only read them.</p>
        </>
      ) : (
        <>
          <h2>
            This blog has three types of users:
          </h2>
          <ul>
            <li>
              Anonymous users can only read published posts.
            </li>
            <li>
              Registered users can read published posts and comment them.
            </li>
            <li>
              Authors can create, edit and delete posts, as well as publish or unpublish them from their admin dashboard.
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
