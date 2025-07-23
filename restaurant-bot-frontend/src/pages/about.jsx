import React from "react";
import { FaRobot, FaUtensils, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c0b17] to-[#4f1b27] text-white py-6 px-3 flex items-center justify-center ">
      <div className="max-w-5xl w-full bg-white text-black rounded-3xl shadow-2xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-orange-500 text-center">
          About FoodieBot
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          FoodieBot is your smart dining companion – helping you discover great
          restaurants, browse menus, make reservations, and place orders in just
          a few taps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center">
          <div className="p-6 rounded-xl bg-orange-50 shadow">
            <FaRobot className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Powered by AI</h3>
            <p className="text-gray-600">
              Built on Microsoft Bot Framework and Azure AI for smart,
              personalized assistance.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-orange-50 shadow">
            <FaUtensils className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">One-stop Dining</h3>
            <p className="text-gray-600">
              From discovering places to making payments – do it all in one
              chat.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-orange-50 shadow">
            <FaHeart className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              We aim to delight you with seamless, convenient, and friendly
              service.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Want to learn more?
          </h2>
          <p className="text-gray-600">
            Get in touch with us on our{" "}
            <a href="/contact" className="text-orange-500 hover:underline">
              Contact Page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
