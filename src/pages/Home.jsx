import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
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
        </>
      ) : (
        <>
          <p>
            As a logged-in user, you can view all published posts and comment
            them. You can delete your own comments, but to create, edit or
            delete posts you need to be an author. Contact the site admin to get
            that permission.
          </p>
        </>
      )}
    </>
  );
}

export default Home;
