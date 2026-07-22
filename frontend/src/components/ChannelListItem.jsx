export default function ChannelListItem({ name, active, ...args }) {
  const styles = active
    ? "border-accent text-zinc-100"
    : "border-transparent hover:border-[oklch(45%_0.02_260)] hover:text-[oklch(90%_0.005_260)]";

  return (
    <button
      className={
        "flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-2 leading-none " +
        styles
      }
      {...args}
    >
      <span className="text-[17px] font-normal text-zinc-500">#</span>
      <span className="text-[14.5px] font-medium">{name}</span>
    </button>
  );
}
