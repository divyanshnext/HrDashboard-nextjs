"use client";

import { useBookmarks } from "../context/BookmarkContext";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

function getRandomDept() {
  return departments[Math.floor(Math.random() * departments.length)];
}

function StarRating({ rating }) {
  // rating is number 1-5, fill stars accordingly
  return (
    <div className="flex space-x-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-current" : "stroke-current"}`}
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

  // Add performance rating, random 1-5 for now if no user.rating
  const rating = user.rating || Math.floor(Math.random() * 5) + 1;

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(user.id);
    } else {
      addBookmark(user);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h2
          className="text-xl font-semibold cursor-pointer"
          onClick={() => router.push(`/employee/${user.id}`)}
        >
          {user.firstName} {user.lastName}
        </h2>
        <span className="text-sm text-gray-500">{department}</span>
      </div>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm">Age: {user.age}</p>
      <div>
        <StarRating rating={rating} />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          View
        </button>

        <button
          onClick={toggleBookmark}
          className={`px-3 py-1 rounded text-sm text-white ${
            bookmarked
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>

        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
          Promote
        </button>
      </div>
    </div>
  );
}
