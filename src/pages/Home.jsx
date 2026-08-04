import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? <h1>Hello, {user.firstname}</h1> : <h1>Home</h1>}
      {user?.isAuthor ? (
        <>
          As an author, you can manage your blog posts as well as add or delete
          comments to other author's posts.
        </>
      ) : (
        <>
          <p>
            As a logged-in user, you can view all published posts and comment
            them.
          </p>{" "}
          <p>
            You can delete your own comments, but to create, edit or delete
            posts you need to be an author. Contact the site admin to get that
            permission.
          </p>
        </>
      )}
    </>
  );
}

export default Home;
