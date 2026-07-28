import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <>{isAuthenticated ? <h1>Hello, {user.firstname}</h1> : <h1>Home</h1>}</>
  );
}

export default Home;
