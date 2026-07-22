import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage({ type }) {
  const isLogin = type === "login";
  const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
  const title = isLogin ? "Login" : "Signup";
  const action = isLogin ? "Log In" : "Sign Up";

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setAuth(data);
    navigate("/");
  }

  async function handleGuest() {
    const res = await fetch("/api/auth/guest", { method: "POST" });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    setAuth(data);
    navigate("/");
  }

  return (
    <div className="flex h-screen flex-col justify-center gap-3 pb-20">
      <h1 className="text-center text-2xl">{title}</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-125 flex-col items-center gap-3"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full rounded-md border border-zinc-600 p-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded-md border border-zinc-600 p-3"
          required
        />
        <button
          type="submit"
          className="w-full rounded-md border border-zinc-600 p-2 hover:bg-zinc-300 hover:text-black"
        >
          {action}
        </button>
      </form>
      {error && (
        <p className="mt-1 transform-gpu text-center text-sm text-red-500">
          {error}
        </p>
      )}
      <p className="flex flex-col gap-1 text-center text-sm text-zinc-500">
        {isLogin ? (
          <>
            <span>Don't have an account?</span>
            <span>
              <Link to="/signup" className="text-zinc-300 hover:underline">
                Sign up
              </Link>{" "}
              or{" "}
              <button
                onClick={handleGuest}
                className="cursor-pointer text-zinc-300 hover:underline"
              >
                continue as guest
              </button>
            </span>
          </>
        ) : (
          <>
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-zinc-300 hover:underline">
                Log in
              </Link>
            </span>
            <div className="h-5"></div>
          </>
        )}
      </p>
    </div>
  );
}
