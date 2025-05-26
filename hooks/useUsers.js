"use client";
import { useEffect, useState } from 'react';

export default function useUsers(limit = 20) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        // Try fetching from local API first
        const res = await fetch(`/api/users`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setUsers(data.slice(0, limit));
            setLoading(false);
            return;
          }
        }
        // Fallback to dummyjson if local API is empty
        const dummyRes = await fetch(`https://dummyjson.com/users?limit=20`); // Updated limit to 20 for dashboard
        const dummyData = await dummyRes.json();
        if (dummyData && Array.isArray(dummyData.users)) {
          setUsers(dummyData.users);
          // Seed local API with dummy users
          await Promise.all(
            dummyData.users.map(user =>
              fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
              })
            )
          );
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setUsers([]);
      }
      setLoading(false);
    }
    fetchUsers();
  }, [limit]);

  return { users, loading };
}
