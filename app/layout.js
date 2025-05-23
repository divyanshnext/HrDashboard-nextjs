"use client";

import './globals.css'
import DarkModeToggle from '../components/DarkModeToggle';
import { BookmarkProvider } from '../context/BookmarkContext';
import Sidebar from '../components/Sidebar';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <SessionProvider>
          <BookmarkProvider>
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col">
              {/* Header with dark mode toggle */}
              <header className="flex justify-end border-b border-gray-300 dark:border-gray-700 mb-4 p-2">
                <DarkModeToggle />
              </header>

              {/* Main content */}
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </BookmarkProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
