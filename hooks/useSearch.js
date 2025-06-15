import { useState, useMemo } from "react";

export function useSearch(users) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const filteredUsers = useMemo(() => {
    // Ensure selectedRatings are numbers for comparison
    const selectedRatingsNum = selectedRatings.map(Number);
    return users.filter((user) => {
      const term = searchTerm.trim().toLowerCase();
      const userFirst = user.firstName?.toLowerCase() || "";
      const userLast = user.lastName?.toLowerCase() || "";
      const userEmail = user.email?.toLowerCase() || "";
      const userDept = user.department?.toLowerCase() || "";
      const userRating =
        typeof user.rating === "number"
          ? Math.round(user.rating)
          : user.rating && !isNaN(Number(user.rating))
          ? Math.round(Number(user.rating))
          : null;

      const matchesSearch =
        !term ||
        userFirst.includes(term) ||
        userLast.includes(term) ||
        userEmail.includes(term) ||
        userDept.includes(term);

      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.map((d) => d.toLowerCase()).includes(userDept);

      const matchesRating =
        selectedRatingsNum.length === 0 ||
        (userRating !== null && selectedRatingsNum.includes(userRating));

      return matchesSearch && matchesDepartment && matchesRating;
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
