"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedUsers")) || [];
    setBookmarks(saved);
  }, []);

  const addBookmark = (user) => {
    if (!bookmarks.find((u) => u.id === user.id)) {
      const updated = [...bookmarks, user];
      setBookmarks(updated);
      localStorage.setItem("bookmarkedUsers", JSON.stringify(updated));
    }
  };

  const removeBookmark = (id) => {
    const updated = bookmarks.filter((u) => u.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarkedUsers", JSON.stringify(updated));
  };

  const isBookmarked = (id) => {
    return bookmarks.some((u) => u.id === id);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
