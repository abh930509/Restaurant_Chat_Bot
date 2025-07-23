import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./Profile";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#ff4e50] to-[#f9d423] text-white shadow-lg z-50 px-6 py-4 flex items-center justify-between">
      {/* 🍽 Logo & Sidebar */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-white hover:text-yellow-300"
        >
          ☰
        </button>
        <Link
          to="/"
          className="text-2xl font-extrabold flex items-center gap-2 text-white"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span>FoodieBot</span>
        </Link>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-semibold">
        <Link to="/" className="hover:text-yellow-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-yellow-300">
          About
        </Link>
        <Link to="/contact" className="hover:text-yellow-300">
          Contact
        </Link>
      </nav>

      <div className="relative" ref={dropdownRef}>
        {!isLoggedIn ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth")}
              className="text-sm px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-orange-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="text-sm px-4 py-2 bg-white text-orange-600 rounded hover:bg-yellow-100 transition"
            >
              Signup
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-9 h-9 rounded-full border border-white"
              />
              <span className="hidden md:inline text-white font-medium">
                {user?.name || "User"}
              </span>
            </button>
            <ProfileDropdown show={showDropdown} user={user} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
