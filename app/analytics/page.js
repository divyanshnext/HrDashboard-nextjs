"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

  // Mock department average ratings 1 to 5
  const [deptRatings, setDeptRatings] = useState({});
  // Mock bookmarks count over last 6 months
  const [bookmarkTrends, setBookmarkTrends] = useState([]);

  useEffect(() => {
    // Generate random average ratings per dept
    const ratings = {};
    departments.forEach((dep) => {
      ratings[dep] = +(Math.random() * 4 + 1).toFixed(2); // between 1 and 5
    });
    setDeptRatings(ratings);

    // Generate bookmark trends for last 6 months
    const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
    const trends = months.map(() => Math.floor(Math.random() * 20) + 5);
    setBookmarkTrends(trends);
  }, []);

  const barData = {
    labels: departments,
    datasets: [
      {
        label: "Avg Rating",
        data: departments.map((dep) => deptRatings[dep]),
        backgroundColor: "rgba(37, 99, 235, 0.7)", // Tailwind blue-600
      },
    ],
  };

  const lineData = {
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Bookmarks",
        data: bookmarkTrends,
        fill: false,
        borderColor: "rgba(234, 179, 8, 0.8)", // Tailwind yellow-500
        tension: 0.3,
      },
    ],
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Department-wise Avg Ratings</h2>
        <Bar data={barData} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Bookmark Trends (Last 6 Months)</h2>
        <Line data={lineData} />
      </section>
    </div>
  );
}
