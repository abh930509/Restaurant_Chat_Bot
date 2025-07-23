import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileDropdown = ({ show, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successful");
    navigate("/");
  };

  if (!show) return null;

  return (
    <div className="absolute right-6 top-16 w-64 bg-white rounded-xl shadow-2xl z-50 border border-orange-100 animate-fade-in">
      <div className="p-5 border-b flex flex-col items-center bg-gradient-to-r from-orange-100 to-yellow-50 rounded-t-xl">
        <img
          src="/images/profile.png"
          alt="User"
          className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 shadow-sm mb-2"
        />
        <h3 className="text-lg font-bold text-orange-600">
          {user?.name || "User"}
        </h3>
        <p className="text-sm text-gray-500">
          {user?.email || "user@example.com"}
        </p>
      </div>

      <ul className="p-3 space-y-2 text-sm text-gray-700">
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer font-medium">
          My Profile
        </li>
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer font-medium">
          Settings
        </li>
        <li
          onClick={handleLogout}
          className="p-2 rounded hover:bg-red-50 cursor-pointer text-red-600 font-semibold"
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
