import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import MessageList from "../components/MessageList";
import Sender from "../components/Sender";
import Sidebar from "../components/Sidebar";
import { useFetch } from "../hooks/useFetch";
import { socket } from "../lib/socket";

export default function ChatPage() {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState({});
  const [messages, setMessages] = useState({});

  const [fetchMessages, isMessagesLoading] = useFetch(async (channelId) => {
    const res = await fetch(`/api/messages/${channelId}`);
    if (!res.ok) return;

    const data = await res.json();
    setMessages((prev) => ({ ...prev, [channelId]: data.messages }));
  });
  const [fetchChannels, isChannelsLoading] = useFetch(async () => {
    const res = await fetch("/api/channels");
    if (!res.ok) return;

    const data = await res.json();
    setChannels(data.channels);
    setActiveChannel(data.channels[0]);
    fetchMessages(data.channels[0]._id);
  });

  useEffect(() => {
    fetchChannels();

    socket.connect();

    socket.on("message", (msg) => {
      setMessages((prev) => {
        if (!prev[msg.channelId]) return prev;
        return {
          ...prev,
          [msg.channelId]: [...(prev[msg.channelId] ?? []), msg],
        };
      });
    });

    return () => socket.off("message");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChannelChange(channel) {
    setActiveChannel(channel);
    if (!messages[channel._id]) {
      fetchMessages(channel._id);
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

        {isMessagesLoading || isChannelsLoading ? (
          <div className="flex flex-1 items-end justify-center pb-10">
            <Loader />
          </div>
        ) : (
          <MessageList
            key={activeChannel._id}
            messages={messages[activeChannel._id] ?? []}
          />
        )}

        <Sender channelName={activeChannel.name} callback={send} />
      </main>
    </div>
  );
}
