import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ChannelListItem from "./ChannelListItem";

export default function Sidebar({ channels, active, setActive }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (!res.ok) return;
    setAuth(null);
    navigate("/login");
  }

  return (
    <aside className="bg-sidebar flex w-62.5 flex-none flex-col">
      <div className="mt-1 flex h-12 items-center border-b-2 border-black/30 px-4 font-semibold">
        Super Cool Chat
      </div>

      <nav className="flex flex-1 flex-col gap-px overflow-y-auto p-2">
        {channels.map((c) => (
          <ChannelListItem
            key={c._id}
            onClick={() => setActive(c)}
            name={c.name}
            active={c._id === active._id}
          />
        ))}
      </nav>

      <div className="relative flex h-13 items-center">
        {isMenuOpen && (
          <div className="bg-base absolute right-3 bottom-13 left-3 rounded-md border border-[oklch(30%_0.006_260)] px-1 py-1 shadow-lg">
            <button
              onClick={logout}
              className="flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-3 py-2 text-left text-[13px] text-zinc-300 hover:bg-[oklch(24%_0.006_260)]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-none"
                data-om-id="dfe46236:43"
              >
                <path
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                  data-om-id="dfe46236:44"
                ></path>
                <polyline
                  points="16 17 21 12 16 7"
                  data-om-id="dfe46236:45"
                ></polyline>
                <line
                  x1="21"
                  y1="12"
                  x2="9"
                  y2="12"
                  data-om-id="dfe46236:46"
                ></line>
              </svg>
              <span>Log out</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-full w-full cursor-pointer px-3 text-left text-[13px] font-semibold hover:bg-[oklch(20%_0.006_260)]"
        >
          {auth.username}
        </button>
      </div>
    </aside>
  );
}
