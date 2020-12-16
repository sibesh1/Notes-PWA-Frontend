import React, { useState } from "react";
import axios from "axios";
import { setToken } from "./AddNote";

const baseUrl = "/api/login";
function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user_ = await login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user_));
      setUser(user_);
      setToken(user_.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
      setTimeout(() => {
        console.log(user);
      }, 5000);
    }
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
