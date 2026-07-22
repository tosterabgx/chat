import Message from "./Message";

export default function Messages({ content }) {
  return (
    <div className="flex flex-1 scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.08)] flex-col gap-2.5 overflow-y-auto py-4.5">
      {content.map((m) => (
        <Message text={m} />
      ))}
    </div>
  );
}
