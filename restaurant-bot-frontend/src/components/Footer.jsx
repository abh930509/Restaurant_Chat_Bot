import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 px-8 bottom-0 w-full py-10 shadow-lg ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span className="text-orange-400 text-3xl">🍴</span> FoodieBot
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Your personal restaurant assistant. Discover cuisines, reserve
            tables, and order meals in seconds.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:text-orange-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-orange-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-400 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-orange-400 transition">
                Menu
              </a>
            </li>
            <li>
              <a href="/discover" className="hover:text-orange-400 transition">
                Discover
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Connect with us
          </h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-400 transition">
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-300 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} FoodieBot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
