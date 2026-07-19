import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { io } from "socket.io-client";

let socket = null;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [auth, setAuth] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));

    fetch("/api/auth/me").then((data) => setAuth(data.ok));

    socket = io();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  function send() {
    const msg = inputRef.current.value;
    if (!msg) return;
    socket.emit("message", msg);
    inputRef.current.value = "";
  }

  function logout() {
    fetch("/api/auth/logout", { method: "POST" }).then(setAuth(false));
  }

  return (
    <>
      <h1 className="pt-10 pb-3 text-center text-2xl">Chat</h1>
      <main className="mx-auto w-125 rounded-md border-2 border-zinc-400">
        <div className="flex max-h-100 flex-col gap-0.5 overflow-y-auto border-b-2 border-zinc-400 px-2 py-1">
          {messages.map((m, i) => {
            return <span key={i}>{m.text}</span>;
          })}
        </div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && send()}
          autoFocus
          className="w-full px-2 py-1 outline-none"
          placeholder="Type here"
        />
      </main>
      <div className="mt-5 space-x-5 text-center text-sm text-current/40">
        {(!auth && (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )) || <button onClick={logout}>Logout</button>}
      </div>
    </>
  );
}
