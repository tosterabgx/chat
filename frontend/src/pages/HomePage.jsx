import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { io } from "socket.io-client";

let socket = null;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [auth, setAuth] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));

    fetch("/api/auth/me").then(
      async (res) => res.ok && setAuth(await res.json()),
    );

    socket = io();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [messages]);

  function send() {
    const text = inputRef.current.value;
    if (!text) return;
    socket.emit("message", text);
    inputRef.current.value = "";
  }

  function logout() {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      setAuth(null);
      socket.disconnect();
      socket.connect();
    });
  }

  return (
    <>
      <h1 className="pt-10 pb-3 text-center text-2xl">Chat</h1>
      <main className="mx-auto w-125 rounded-md border-2 border-zinc-400">
        <div className="flex max-h-100 scrollbar-thin flex-col gap-0.5 overflow-y-auto border-b-2 border-zinc-400 px-2 py-1">
          {messages.map((m) => {
            return (
              <span key={m._id}>
                {m.username}: {m.text}
              </span>
            );
          })}
          <div ref={messagesEndRef} />
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
        )) || (
          <>
            <span>{auth.username}</span>
            <button onClick={logout} className="cursor-pointer">
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
