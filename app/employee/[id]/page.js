"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployeePage({ params }) {
  const { id } = React.use(params); // <-- unwrap params with React.use()
  const [activeTab, setActiveTab] = useState("Overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        // Try fetching from local API first
        let res = await fetch(`/api/users`);
        if (res.ok) {
          const users = await res.json();
          const found = users.find((u) => String(u.id) === String(id));
          if (found) {
            setUser(found);
            setLoading(false);
            return;
          }
        }
        // Fallback to dummyjson
        res = await fetch(`https://dummyjson.com/users/${id}`); // Ensure correct fallback URL
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();

        // Mock extra fields: bio, pastPerformance, department, rating
        const bio = "Dedicated and hardworking employee with 5 years of experience.";
        const pastPerformance = [
          { year: 2020, rating: 4 },
          { year: 2021, rating: 5 },
          { year: 2022, rating: 3 },
          { year: 2023, rating: 4 },
        ];
        const department = ["Engineering", "Marketing", "Sales", "HR", "Finance"][
          Math.floor(Math.random() * 5)
        ];
        const rating = Math.floor(Math.random() * 5) + 1;

        setUser({ ...data, bio, pastPerformance, department, rating });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!user) return null;

  const { address, phone, bio, pastPerformance, department, rating } = user;

  // Fallback for missing address (for users created via form)
  const safeAddress = address || { address: "N/A", city: "N/A", state: "N/A" };
  const safePhone = phone || "N/A";

  const renderStars = (num) => {
    return (
      <div className="flex space-x-1 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= num ? "fill-current" : "stroke-current"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={star <= num ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.838-.196-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.966z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {user.firstName} {user.lastName}
      </h1>

      <div className="mb-6">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {safePhone}
        </p>
        <p>
          <strong>Address:</strong> {safeAddress.address}, {safeAddress.city}, {safeAddress.state}
        </p>
        <p>
          <strong>Department:</strong>{" "}
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{department}</span>
        </p>
        <div className="flex items-center gap-2">
          <strong>Performance Rating:</strong> {renderStars(rating)}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {["Overview", "Projects", "Feedback"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Overview" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Bio</h2>
            <p className="mb-4">{bio}</p>

            <h3 className="font-semibold mb-1">Past Performance History</h3>
            <ul className="list-disc pl-5">
              {(pastPerformance || []).map((entry) => (
                <li key={entry.year}>
                  Year {entry.year}: {renderStars(entry.rating)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Projects" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p>Project data will be here (mock or to be implemented).</p>
            {/* Add mock projects list or leave placeholder for now */}
          </div>
        )}

        {activeTab === "Feedback" && <FeedbackForm userId={id} />}
      </div>
    </div>
  );
}

function FeedbackForm({ userId }) {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // For now, just mock submit
    alert(`Feedback submitted for user ${userId}: ${feedback}`);
    setFeedback("");
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <label htmlFor="feedback" className="block font-semibold mb-1">
        Submit Feedback
      </label>
      <textarea
        id="feedback"
        className="w-full border rounded p-2 mb-2"
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
      {submitted && <p className="mt-2 text-green-600">Feedback submitted successfully!</p>}
    </form>
  );
}
