import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    navigate("/");
  }
  return (
    <div className={styles.navBar}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users/login">Login</NavLink>
      <NavLink to="/users/register">Register</NavLink>
      <NavLink to="/posts/">View Posts</NavLink>
      <NavLink to="/posts/new-post">New Post</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default NavigationBar;
