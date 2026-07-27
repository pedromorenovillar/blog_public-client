import { NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users/login">Login</NavLink>
      <NavLink to="/users/register">Register</NavLink>
      <NavLink to="/posts/">View Posts</NavLink>
      <NavLink to="/posts/new-post">New Post</NavLink>
      <NavLink to="/users/logout">Logout</NavLink>
    </>
  );
}

export default NavigationBar;
