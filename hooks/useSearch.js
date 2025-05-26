import { useState, useMemo } from "react";

export function useSearch(users) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDepartments.length === 0 || selectedDepartments.includes(user.department);

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(Math.round(user.rating));

      return matchesSearch && matchesDept && matchesRating;
    });
  }, [users, searchTerm, selectedDepartments, selectedRatings]);

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
  };
}
