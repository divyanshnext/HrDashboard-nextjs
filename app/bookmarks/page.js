"use client";

import { useBookmarks } from "../../context/BookmarkContext"; // make sure this hook exists
import Button from "../../components/Button";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, isBookmarked } = useBookmarks();

  if (bookmarks.length === 0)
    return <p className="p-6 text-center text-gray-600">No bookmarked employees yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>

      <ul className="space-y-4">
        {bookmarks.map((emp) => (
          <li
            key={emp.id}
            className="flex justify-between items-center p-4 border rounded shadow-sm"
          >
            <div>
              <p className="font-semibold text-lg">
                {emp.firstName} {emp.lastName}
              </p>
              <p className="text-sm text-gray-500">{emp.email}</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => alert(`Promote action triggered for ${emp.firstName}`)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Promote
              </Button>

              <Button
                onClick={() => removeBookmark(emp.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
