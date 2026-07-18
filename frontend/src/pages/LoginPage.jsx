import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data["message"]);
      return;
    }

    navigate("/");
  }

  return (
    <>
      <h1 className="pt-10 pb-3 text-center text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-125 flex-col gap-3"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="rounded-md border border-zinc-600 p-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-md border border-zinc-600 p-3"
          required
        />
        <button
          type="submit"
          className="rounded-md border border-zinc-600 p-2 hover:bg-zinc-300 hover:text-black"
        >
          Log In
        </button>
      </form>
      {error && (
        <p className="mt-3 transform-gpu text-center text-sm text-red-500">
          {error}
        </p>
      )}
    </>
  );
}
