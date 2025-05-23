"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Analytics", path: "/analytics" },
  { label: "Bookmarks", path: "/bookmarks" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-md sticky top-0">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-yellow-400">HR Dashboard</h1>
        <p className="text-sm text-gray-400">Manage with ease</p>
      </div>

      <nav className="flex flex-col gap-2 p-4 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-2 rounded-md transition text-sm font-medium ${
              pathname === item.path
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {session ? (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut()}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      ) : null}

      <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
        © 2025 HR Tools
      </div>
    </aside>
  );
}
