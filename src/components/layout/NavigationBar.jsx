import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.navBar}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/posts/">View Blog</NavLink>
      {user?.isAuthor && <a href={ADMIN_URL}>Dashboard</a>}
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/users/login">Login</NavLink>
          <NavLink to="/users/register">Register</NavLink>
        </>
      )}
    </div>
  );
}

export default NavigationBar;
