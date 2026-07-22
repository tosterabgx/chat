import { useEffect, useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import Sender from "../components/Sender";
import Sidebar from "../components/Sidebar";
import { socket } from "../lib/socket";

export default function ChatPage() {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/channel")
      .then((res) => res.json())
      .then((data) => {
        setChannels(data.channels);
        setActiveChannel(data.channels[0]);
      });

    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));

    socket.connect();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("message");
  }, []);

  function send(text) {
    socket.emit("message", text);
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
          channelName={activeChannel.name}
          channelDesc={activeChannel.description}
        />

        <MessageList messages={messages} />

        <Sender channelName={activeChannel.name} callback={send} />
      </main>
    </div>
  );
}
