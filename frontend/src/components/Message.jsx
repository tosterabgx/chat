export default function Message({ message }) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  function getColorByName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 55%, 68%)`;
  }

  return (
    <div className="px-2 text-[14.5px] leading-[1.7] hover:bg-[oklch(22%_0.006_260)]">
      <span className="text-zinc-500">[{time}]</span>{" "}
      <span
        className="font-bold"
        style={{ color: getColorByName(message.username) }}
      >
        {message.username}
      </span>{" "}
      <span className="text-zinc-200">{message.text}</span>
    </div>
  );
}
