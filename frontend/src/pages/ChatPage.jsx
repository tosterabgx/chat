import { useEffect, useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import Sender from "../components/Sender";
import Sidebar from "../components/Sidebar";
import { socket } from "../lib/socket";

export default function ChatPage() {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetch("/api/channels")
      .then((res) => res.json())
      .then((data) => {
        setChannels(data.channels);
        setActiveChannel(data.channels[0]);
        fetchMessagesInChannel(data.channels[0]._id);
      });

    socket.connect();

    socket.on("message", (msg) => {
      setMessages((prev) => ({
        ...prev,
        [msg.channelId]: [...(prev[msg.channelId] ?? []), msg],
      }));
    });

    return () => socket.off("message");
  }, []);

  async function fetchMessagesInChannel(channelId) {
    const res = await fetch(`/api/messages/${channelId}`);
    const data = await res.json();
    setMessages((prev) => ({ ...prev, [channelId]: data.messages }));
  }

  function handleChannelChange(channel) {
    setActiveChannel(channel);
    if (!messages[channel._id]) {
      fetchMessagesInChannel(channel._id);
    }
  }

  function send(text) {
    socket.emit("message", { channelId: activeChannel._id, text });
  }

  return (
    <div className="bg-base flex h-screen w-screen text-zinc-100">
      <Sidebar
        channels={channels}
        active={activeChannel}
        setActive={handleChannelChange}
      />

      <main className="bg-base flex flex-1 flex-col">
        <Header
          channelName={activeChannel.name}
          channelDesc={activeChannel.description}
        />

        <MessageList messages={messages[activeChannel._id] ?? []} />

        <Sender channelName={activeChannel.name} callback={send} />
      </main>
    </div>
  );
}
