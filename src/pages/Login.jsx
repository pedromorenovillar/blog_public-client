import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { user, login } = useContext(AuthContext); // use login from context
  const navigate = useNavigate();
  console.log("Current user:", user);
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(email, password);
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    return;
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email ?? ""}
          onChange={handleEmail}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password ?? ""}
          onChange={handlePassword}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
