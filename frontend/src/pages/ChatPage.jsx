import { useState } from "react";
import Header from "../components/Header";
import Messages from "../components/Messages";
import Sender from "../components/Sender";
import Sidebar from "../components/Sidebar";

export default function ChatPage() {
  const channels = ["general", "random", "memes"];
  const descriptions = {
    general: "Say hi, share updates",
  };
  const [activeChannel, setActiveChannel] = useState("general");

  function send(text) {
    console.log(text);
  }

  return (
    <div className="bg-base flex h-screen w-screen text-zinc-100">
      <Sidebar
        channels={channels}
        active={activeChannel}
        setActive={setActiveChannel}
      />

      <main className="bg-base flex flex-1 flex-col">
        <Header
          channelName={activeChannel}
          channelDesc={descriptions[activeChannel]}
        />

        <Messages content={["test", "test2"]} />

        <Sender activeChannel={activeChannel} callback={send} />
      </main>
    </div>
  );
}
