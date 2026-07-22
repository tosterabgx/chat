import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.08)] flex-col gap-2.5 overflow-y-auto pt-4.5 pb-2">
      {messages.map((m) => (
        <Message key={m._id} message={m} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
