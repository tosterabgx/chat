export default function Header({ channelName, channelDesc }) {
  return (
    <header className="flex h-12 flex-none items-center justify-between px-4">
      <div className="flex items-center gap-2 leading-none">
        <span className="text-[19px] font-normal text-zinc-500">#</span>
        <span className="text-[15px] font-semibold">{channelName}</span>
        <div className="mx-1.5 h-5 w-px bg-zinc-700"></div>
        <span className="text-[13px] text-zinc-400">{channelDesc}</span>
      </div>
    </header>
  );
}
