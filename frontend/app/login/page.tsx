"use client";

import { useState } from "react";
import React from "react";

export default function LoginPage(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await res.json();
    localStorage.setItem("token", data.token);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 border p-6 rounded-lg fade-in">
        <h1 className="text-xl font-semibold mb-4">Login</h1>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white py-2"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
