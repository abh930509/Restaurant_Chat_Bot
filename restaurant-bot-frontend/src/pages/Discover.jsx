// src/pages/Discover.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Discover = () => {
  const [search, setSearch] = useState("");

  const restaurants = [
    {
      name: "Bombay Bites",
      rating: 4.5,
      location: "Mumbai",
      price: "$$",
      image:
        "https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sakura Sushi",
      rating: 4.8,
      location: "Tokyo",
      price: "$$$",
      image:
        "https://images.unsplash.com/photo-1679794479349-2a4582ebc478?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Romeo's Pasta",
      rating: 4.3,
      location: "Rome",
      price: "$$",
      image:
        "https://plus.unsplash.com/premium_photo-1664472619078-9db415ebef44?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Burger Beast",
      rating: 4.7,
      location: "New York",
      price: "$",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dr",
    },
  ];

  const filteredRestaurants = restaurants.filter((rest) =>
    rest.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">
        Discover Restaurants
      </h2>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-md w-full sm:w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>

        <select className="px-4 py-2 rounded-lg shadow-md">
          <option value="">Cuisine</option>
          <option value="indian">Indian</option>
          <option value="japanese">Japanese</option>
          <option value="italian">Italian</option>
        </select>

        <select className="px-4 py-2 rounded-lg shadow-md">
          <option value="">Location</option>
          <option value="mumbai">Mumbai</option>
          <option value="new-york">New York</option>
          <option value="tokyo">Tokyo</option>
        </select>

        <select className="px-4 py-2 rounded-lg shadow-md">
          <option value="">Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((r, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={r.image}
              alt={r.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{r.name}</h3>
              <p className="text-sm text-gray-600">
                📍 {r.location} · ⭐ {r.rating} · {r.price}
              </p>
              <button className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
