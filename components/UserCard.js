"use client";

import { useBookmarks } from "../context/BookmarkContext";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

function getRandomDept() {
  return departments[Math.floor(Math.random() * departments.length)];
}

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "fill-current" : "stroke-current"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.838-.196-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ))}
    </div>
  );
}

export default function UserCard({ user }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(user.id);
  const router = useRouter();

  const department = useMemo(() => {
    return user.department || user.company?.title || getRandomDept();
  }, [user]);

  // Ensure stable random rating per user (based on ID or hash fallback)
  const rating = useMemo(() => {
    return user.rating ?? (user.id ? (user.id % 5) + 1 : 3);
  }, [user]);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 transition hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2
            className="text-lg font-semibold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => router.push(`/employee/${user.id}`)}
          >
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">
          {department}
        </span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-300">Age: {user.age}</p>
        <StarRating rating={rating} />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm transition"
        >
          View
        </button>

        <button
          onClick={toggleBookmark}
          className={`px-4 py-1.5 rounded-md text-sm transition ${
            bookmarked
              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
              : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
        >
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>

        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-md text-sm transition">
          Promote
        </button>
      </div>
    </div>
  );
}
