import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c0b17] to-[#4f1b27] text-white flex items-center justify-center p-6">
      <div className="bg-white text-black max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Info Section */}
        <div className="bg-[#1d0f13] text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-orange-400">
            Contact Us
          </h2>
          <p className="text-white/80 mb-6">
            Have questions, feedback, or just want to say hi? We'd love to hear
            from you!
          </p>
          <div className="space-y-4 text-white/80">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-400" />
              <span>+91 9369073167</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-400" />
              <span>abhishekgiri250700@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-400" />
              <span>123 Bot Streets , Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <form className="p-10 space-y-6 bg-[#f8f2ec]">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
