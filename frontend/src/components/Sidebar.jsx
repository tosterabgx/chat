import ChannelListItem from "./ChannelListItem";

export default function Sidebar({ channels, active, setActive }) {
  return (
    <aside className="bg-sidebar flex w-62.5 flex-none flex-col">
      <div className="mt-1 flex h-12 items-center border-b-2 border-black/30 px-4 font-semibold">
        Super Cool Chat
      </div>

      <nav className="flex flex-1 flex-col gap-px overflow-y-auto p-2">
        {channels.map((c) => (
          <ChannelListItem
            key={c}
            onClick={() => setActive(c)}
            name={c}
            active={c === active}
          />
        ))}
      </nav>
    </aside>
  );
}
