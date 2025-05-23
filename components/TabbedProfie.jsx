"use client";

import { useState } from "react";

export default function TabbedProfile({ user }) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <h2 className="font-semibold mb-2">Bio</h2>
            <p>{user.bio}</p>
            <p className="mt-4">Department: {user.department}</p>
            <p>Rating: {user.rating} / 5 ⭐</p>
          </>
        );
      case "projects":
        return (
          <>
            <h2 className="font-semibold mb-2">Projects</h2>
            <ul className="list-disc pl-5">
              <li>Project Alpha - Completed</li>
              <li>Project Beta - In Progress</li>
              <li>Project Gamma - Planned</li>
            </ul>
          </>
        );
      case "feedback":
        return (
          <>
            <h2 className="font-semibold mb-2">Feedback</h2>
            <p>No feedback available yet.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="flex gap-4 mb-4 border-b">
        {["overview", "projects", "feedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 ${
              activeTab === tab ? "border-blue-500 font-bold" : "border-transparent"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
      <section>{renderContent()}</section>
    </div>
  );
}
