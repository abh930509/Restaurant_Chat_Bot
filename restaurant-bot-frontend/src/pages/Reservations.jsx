import { useState } from "react";

const Reservations = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
          📅 Make a Reservation
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="time"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <textarea
            placeholder="Special requests..."
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
          >
            Confirm Reservation 🍽️
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-6 text-green-600 font-semibold text-center">
            ✅ Reservation successful! We’ll see you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
