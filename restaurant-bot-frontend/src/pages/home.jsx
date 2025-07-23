import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const sendMessageToBot = async (message) => {
  try {
    const res = await fetch("http://localhost:5000/api/bot/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "message", text: message }),
    });

    if (!res.ok) throw new Error("Failed to reach bot");

    const data = await res.json();
    return {
      reply: data.reply || "🤖 I'm not sure how to respond to that.",
      menu: data.menu || [],
      cart: data.cart || [],
      total: data.total || 0,
      pay: data.pay || null,
      track: data.track || false,
      reservation: data.reservation || null,
      recommendation: data.recommendation || [],
    };
  } catch (err) {
    console.error("Bot error:", err);
    return {
      reply: "❌ Bot is unavailable. Try again later.",
      menu: [],
      cart: [],
      total: 0,
      pay: null,
      track: false,
      reservation: null,
      recommendation: [],
    };
  }
};

const Home = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Welcome! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [etaCountdown, setEtaCountdown] = useState(null);

  useEffect(() => {
    if (etaCountdown === null) return;
    const timer = setInterval(() => {
      setEtaCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [etaCountdown]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    const userMessage = input.trim();

    const newMessages = [...messages, { type: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setMessages((prev) => [...prev, { type: "bot", text: "Typing..." }]);

    const {
      reply,
      menu,
      cart,
      total,
      pay,
      track,
      reservation,
      recommendation,
    } = await sendMessageToBot(userMessage);

    if (track) setEtaCountdown(15 * 60);

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        type: "bot",
        text: reply,
        menu,
        cart,
        total,
        pay,
        track,
        reservation,
        recommendation,
      };
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f2ec] to-[#fff9f4] text-black font-sans px-4 py-6 p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#c75237] mb-2">
          FoodieBot Chat
        </h1>
        <p className="text-gray-700 text-lg">
          Your smart restaurant assistant is here 🍽️
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-6 min-h-[75vh]">
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-${msg.type === "user" ? "right" : "left"}`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-xl shadow ${
                  msg.type === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {msg.text}
              </p>

              {/* Menu Cards */}
              {(msg.menu?.length > 0 || msg.recommendation?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {(msg.menu || msg.recommendation).map((item, index) => (
                    <div
                      key={index}
                      className="bg-white text-black rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="text-orange-500 font-medium">
                          ₹{item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Styled Cart */}
              {msg.cart && msg.cart.length > 0 && msg.total > 0 && (
                <div className="mt-4 p-4 rounded-xl border border-purple-400 bg-purple-50 shadow-lg">
                  <h3 className="text-lg font-bold text-purple-800 mb-2">
                    🛒 Your Cart Summary
                  </h3>

                  <ul className="list-disc pl-5 text-purple-700 space-y-1">
                    {msg.cart.map((item, idx) => (
                      <li key={idx} className="flex justify-between pr-4">
                        <span>{item.name}</span>
                        <span>₹{Number(item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 text-purple-900 font-semibold text-right pr-4">
                    Total: ₹{Number(msg.total).toFixed(2)}
                  </div>

                  <p className="text-sm text-purple-600 mt-2 italic">
                    💡 Type <span className="font-bold">"Pay now"</span> to
                    proceed.
                  </p>
                </div>
              )}

              {/* Receipt */}
              {msg.pay && (
                <div className="mt-4 p-4 rounded-xl border border-green-500 bg-green-50 shadow">
                  <h3 className="text-lg font-bold text-green-700">
                    ✅ Payment Successful!
                  </h3>
                  <p className="text-green-700 font-medium mb-2">🧾 Receipt:</p>
                  <ul className="list-disc pl-5 text-green-800">
                    {msg.pay.cart.map((item, idx) => (
                      <li key={idx}>
                        {item.name} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-green-900">
                    Total Paid: ₹{msg.pay.amount}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Thank you for your order!
                  </p>
                </div>
              )}

              {/* Reservation Block */}
              {msg.reservation && (
                <div className="mt-4 p-4 rounded-xl border border-blue-500 bg-blue-50 shadow">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    📅 Reservation Summary
                  </h3>
                  <div className="space-y-1 text-blue-700">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {msg.reservation.name}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {msg.reservation.date}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {msg.reservation.time}
                    </p>
                    <p>
                      <span className="font-semibold">Guests:</span>{" "}
                      {msg.reservation.guests}
                    </p>
                  </div>
                  <p className="text-sm text-blue-600 italic mt-2">
                    ✅ Please arrive 10 minutes early. Thank you for booking
                    with FoodieBot!
                  </p>
                </div>
              )}

              {/* ETA Countdown */}
              {msg.track && etaCountdown !== null && (
                <div className="mt-4 p-4 rounded-xl border border-blue-400 bg-blue-50 shadow">
                  <h3 className="text-lg font-bold text-blue-800">
                    ⏱ Order Tracking
                  </h3>
                  <p className="text-blue-700">
                    ETA: {Math.floor(etaCountdown / 60)}m {etaCountdown % 60}s
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center bg-[#fef4e6] px-4 py-3 rounded-full shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-black placeholder-gray-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-[#c75237] w-10 h-10 rounded-full flex items-center justify-center ml-2 shadow hover:bg-[#a13f2b] transition"
          >
            <span className="text-xl text-white">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
