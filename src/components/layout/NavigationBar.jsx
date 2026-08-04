import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./NavigationBar.module.css";
import { House, UserStar, Eye, LogOut, KeyRound, UserPen } from "lucide-react";

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
      <NavLink to="/">
        <House />
        Home
      </NavLink>
      <NavLink to="/posts/">
        <Eye />
        View Blog
      </NavLink>
      {user?.isAuthor && (
        <a href={ADMIN_URL}>
          <UserStar />
          Dashboard
        </a>
      )}
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/users/login">
            <KeyRound />
            Login
          </NavLink>
          <NavLink to="/users/register">
            <UserPen />
            Register
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavigationBar;
