"use client";

import UserCard from "../components/UserCard";
import { useSearch } from "../hooks/useSearch";
import { useSession, signIn } from "next-auth/react";
import useUsers from "../hooks/useUsers";

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

export default function HomePage() {
  const { users, loading } = useUsers(20);

  // Only use users from API
  const safeUsers = Array.isArray(users) ? users : [];

  const {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
  } = useSearch(safeUsers);

  const { data: session, status } = useSession();

  // Show loading only if loading or users not loaded
  if (status === "loading" || loading || !Array.isArray(users)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-2xl font-bold">You must be signed in to view this page</h1>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  function toggleDept(dept) {
    if (selectedDepartments.includes(dept)) {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== dept));
    } else {
      setSelectedDepartments([...selectedDepartments, dept]);
    }
  }

  function toggleRating(rating) {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or department..."
        className="border rounded px-4 py-2 w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Department Filters */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Filter by Department:</h3>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => toggleDept(dept)}
              className={`px-3 py-1 rounded border ${
                selectedDepartments.includes(dept)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings Filters */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Filter by Rating:</h3>
        <div className="flex gap-2">
          {[5, 4, 3, 2, 1].map((rate) => (
            <button
              key={rate}
              onClick={() => toggleRating(rate)}
              className={`px-3 py-1 rounded border ${
                selectedRatings.includes(rate)
                  ? "bg-yellow-400 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {rate}★
            </button>
          ))}
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center col-span-full text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
