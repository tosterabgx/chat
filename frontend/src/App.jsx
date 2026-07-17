import { useEffect } from "react";
import { useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/message");
        const data = await res.json();
        setMessages(data["messages"].map((m) => m.text));
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("message");
  }, []);

  function send() {
    const msg = inputRef.current.value;
    if (!msg) return;
    socket.emit("message", msg);
    inputRef.current.value = "";
  }

  return (
    <>
      <h1 className="pt-10 pb-2 text-center text-2xl">Chat</h1>
      <main className="mx-auto w-125 rounded-md border-2 border-zinc-400">
        <div className="flex max-h-100 flex-col gap-0.5 overflow-y-auto border-b-2 border-zinc-400 px-2 py-1">
          {messages.map((m, i) => {
            return <span key={i}>{m}</span>;
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
    </>
  );
}
