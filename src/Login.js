import React, { useState } from "react";
import loginService from "./services/login.js";
import setToken from "./AddNote";

function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user_ = await loginService.login({
        username,
        password,
      });
      setToken(user_.token);
      setUser(user_);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
      setTimeout(() => {
        console.log(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  return (
    <form onSubmit={handleLogin} className="login">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
