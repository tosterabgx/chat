import { useState } from "react";

export default function Sender({ channelName, callback }) {
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    setInput("");
    callback(input);
  }

  return (
    <div className="flex-none px-4 pb-5">
      <div className="border-accent flex items-center rounded-md border">
        <input
          className="flex-1 py-3.5 pl-3.5 text-[14.5px] placeholder-zinc-500 outline-none"
          placeholder={"Message #" + channelName}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          autoFocus
        />
        <button
          className="bg-accent mr-3.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-base hover:opacity-90 active:opacity-80"
          onClick={send}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
