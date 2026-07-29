import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await register(user);
      console.log("user registered successfully!");
      navigate("/users/login");
    } catch (error) {
      console.error(error);
    }
    return;
  }

  function handleUser(e) {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={user.firstName}
          onChange={handleUser}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={user.lastName}
          onChange={handleUser}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleUser}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleUser}
        />
        <label htmlFor="passwordConfirm">Password confirmation</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={user.passwordConfirm}
          onChange={handleUser}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;
