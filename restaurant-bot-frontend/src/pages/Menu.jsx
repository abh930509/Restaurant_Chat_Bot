import { useCart } from "../context/CartContext";
import { useState } from "react";

const Menu = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [confirmations, setConfirmations] = useState({});

  const menuItems = [
    {
      name: "Butter Chicken",
      price: 12,
      img: "https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken-.jpg",
    },
    {
      name: "Margherita Pizza",
      price: 10,
      img: "https://tse2.mm.bing.net/th/id/OIP.oWI38yAzSDcjDvT8xVFlcwHaFb?pid=Api&P=0&h=180",
    },
    {
      name: "Sushi Platter",
      price: 15,
      img: "https://tse4.mm.bing.net/th/id/OIP.k1ynE8x2Vsj6Dy3DP7ttBwHaE8?pid=Api&P=0&h=180",
    },
  ];

  const handleQuantityChange = (name, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.name] || 1;
    addToCart(item, quantity);

    // Show confirmation for this item
    setConfirmations((prev) => ({ ...prev, [item.name]: true }));

    // Hide after 2 seconds
    setTimeout(() => {
      setConfirmations((prev) => ({ ...prev, [item.name]: false }));
    }, 2000);
  };

  return (
    <div className="text-gray-800 px-4 py-8">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
        📋 Our Menu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
          >
            <div className="relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
                Featured
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition">
                {item.name}
              </h3>
              <p className="text-lg text-red-500 font-semibold">
                ₹{item.price}80
              </p>

              <div className="flex justify-center items-center gap-3 mt-4">
                <button
                  onClick={() => handleQuantityChange(item.name, -1)}
                  className="px-2 bg-gray-300 rounded-full hover:bg-gray-400"
                >
                  −
                </button>
                <span>{quantities[item.name] || 1}</span>
                <button
                  onClick={() => handleQuantityChange(item.name, 1)}
                  className="px-2 bg-gray-300 rounded-full hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition duration-300 shadow-md"
              >
                Add to Order 🍽️
              </button>

              {/* Confirmation Message */}
              {confirmations[item.name] && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  ✅ Added to cart!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
