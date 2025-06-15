"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Home, BarChart, Bookmark } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-700 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">
        HR Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
