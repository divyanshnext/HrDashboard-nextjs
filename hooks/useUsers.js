"use client";

import { useEffect, useState } from "react";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        // ✅ ONLY fetch from local API
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data); // ✅ DO NOT slice here
        } else {
          throw new Error("Failed to fetch from /api/users");
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}
