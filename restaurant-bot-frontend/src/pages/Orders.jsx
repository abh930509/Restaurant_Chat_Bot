import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const Orders = () => {
  const { cartItems, addToCart, clearCart, removeOrder } = useCart();
  const [now, setNow] = useState(Date.now());
  const [paymentDone, setPaymentDone] = useState(false);
  const [orders, setOrders] = useState([]);

  // Update timestamp for tracking ETA
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format ETA
  const formatETA = (timestamp, eta) => {
    const remaining = timestamp + eta - now;
    if (remaining <= 0) return "Delivered";
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  const getProgressPercent = (status) => {
    switch (status) {
      case "Preparing":
        return 33;
      case "Out for Delivery":
        return 66;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (!paymentDone) return;

    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.status === "Preparing")
            return { ...o, status: "Out for Delivery" };
          if (o.status === "Out for Delivery")
            return { ...o, status: "Delivered" };
          return o;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [paymentDone]);

  const handlePlaceOrder = () => {
    const timestamp = Date.now();
    const newOrders = cartItems.map((item) => ({
      ...item,
      timestamp,
      eta: 10 * 60000,
      status: "Preparing",
    }));
    setOrders(newOrders);
    clearCart();
    setPaymentDone(true);
  };

  return (
    <div className="text-gray-800 px-4 py-10 min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <h2 className="text-4xl font-extrabold text-orange-600 mb-10 text-center">
        🛒 Orders & Tracking
      </h2>

      {!paymentDone ? (
        <>
          {/* 🛒 Cart Section */}
          <div className="max-w-4xl mx-auto mb-8 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty.
              </p>
            ) : (
              <>
                {cartItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg text-red-500 font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
                <div className="text-right">
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
                  >
                    Pay Now & Place Order 💳
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-8 max-w-4xl mx-auto">
            {orders.map((order, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg border border-orange-100 p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      🍽️ {order.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {order.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Out for Delivery"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      ETA: {formatETA(order.timestamp, order.eta)}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="relative">
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 transition-all duration-500 ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Out for Delivery"
                          ? "bg-yellow-400"
                          : "bg-orange-400"
                      }`}
                      style={{ width: `${getProgressPercent(order.status)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-gray-400 mt-1">
                    {getProgressPercent(order.status)}% complete
                  </p>
                </div>

                {/* Cancel */}
                {order.status !== "Delivered" && (
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        setOrders((prev) =>
                          prev.filter((o) => o.name !== order.name)
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow"
                    >
                      Cancel Order ❌
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
