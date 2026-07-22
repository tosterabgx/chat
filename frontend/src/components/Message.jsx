export default function Message({ text }) {
  return (
    <div className="px-2 text-[14.5px] leading-[1.7] hover:bg-[oklch(22%_0.006_260)]">
      <span className="text-zinc-500">[9:20 AM]</span>{" "}
      <span className={"font-bold " + "text-[#b98ee0]"}>Name</span>{" "}
      <span className="text-zinc-200">{text}</span>
    </div>
  );
}
