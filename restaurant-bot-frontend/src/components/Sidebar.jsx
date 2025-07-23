import {
  FaUtensils,
  FaList,
  FaCalendarAlt,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 
      bg-gradient-to-b from-red-800 to-red-700 text-white p-4 space-y-4 
      z-40 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      `}
    >
      <Link
        to="/discover"
        className="flex items-center gap-3 p-2 hover:bg-red-600 rounded"
      >
        <FaUtensils /> Discover
      </Link>
      <Link
        to="/menu"
        className="flex items-center gap-3 p-2 hover:bg-red-600 rounded"
      >
        <FaList /> Menu
      </Link>
      <Link
        to="/reserve"
        className="flex items-center gap-3 p-2 hover:bg-red-600 rounded"
      >
        <FaCalendarAlt /> Reservations
      </Link>
      <Link
        to="/orders"
        className="flex items-center gap-3 p-2 hover:bg-red-600 rounded"
      >
        <FaShoppingCart /> Orders
      </Link>
      <Link
        to="/recommend"
        className="flex items-center gap-3 p-2 hover:bg-red-600 rounded"
      >
        <FaStar /> Recommendations
      </Link>
    </div>
  );
};

export default Sidebar;
