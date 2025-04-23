// src/components/Login.jsx
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("https://agomez.me/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    alert("Logged in!");
  };

  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
