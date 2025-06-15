"use client";

import React, { useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserCard from "../../components/UserCard";
import { useSearch } from "../../hooks/useSearch";
import useUsers from "../../hooks/useUsers";

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
const ratings = [5, 4, 3, 2, 1];

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search by name, email, or department..."
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

function DepartmentFilter({ selectedDepartments, toggleDept }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-1">Filter by Department:</h3>
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => toggleDept(dept)}
            className={`px-3 py-1 rounded border text-sm transition
              ${
                selectedDepartments.includes(dept)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              }`}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>
  );
}

function RatingFilter({ selectedRatings, toggleRating }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-1">Filter by Rating:</h3>
      <div className="flex gap-2">
        {ratings.map((rate) => (
          <button
            key={rate}
            onClick={() => toggleRating(rate)}
            className={`px-3 py-1 rounded border text-sm transition
              ${
                selectedRatings.includes(rate)
                  ? "bg-yellow-400 text-white border-yellow-400"
                  : "bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              }`}
          >
            {rate}★
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { users, loading, error } = useUsers(20);
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

  const toggleDept = (dept) => {
  setSelectedDepartments((prev) =>
    prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
  );
};

  const toggleRating = (rating) => {
  setSelectedRatings((prev) =>
    prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
  );
};

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-4 h-32 rounded-lg bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-red-600 text-2xl font-bold mb-2">
          Error loading users
        </h1>
        <p className="text-gray-500">{error.message}</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <DepartmentFilter
        selectedDepartments={selectedDepartments}
        toggleDept={toggleDept}
      />
      <RatingFilter
        selectedRatings={selectedRatings}
        toggleRating={toggleRating}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}
