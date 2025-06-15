'use client';

import './globals.css';
import { BookmarkProvider } from '../context/BookmarkContext';
import Sidebar from '../components/Sidebar';
import DarkModeToggle from '../components/DarkModeToggle';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import md5 from 'md5';
import { LogOut, LogIn } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function getGravatarUrl(email) {
  if (!email) return '/default-avatar.png';
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

function HeaderActions() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;

  const gravatarUrl = getGravatarUrl(session?.user?.email);

  return (
    <div className="flex items-center gap-4 ml-auto">
      {session && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
          <img
            src={gravatarUrl}
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
          />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {session.user?.name || 'User'}
          </span>
        </div>
      )}

      <DarkModeToggle />

      {session ? (
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      ) : (
        <button
          onClick={() => router.push('/admin-login')}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          title="Sign In"
        >
          <LogIn size={20} />
        </button>
      )}
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <SessionProvider refetchInterval={0}>
          <BookmarkProvider>
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col">
              <header className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 mb-4 p-2">
                <HeaderActions />
              </header>

              <main className="flex-grow">{children}</main>
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            </div>
          </BookmarkProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
