import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    const timestamp = new Date();
    const eta = 30 * 60 * 1000; // 30 mins in ms

    setCartItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) {
        return prev.map((i) =>
          i.name === item.name
            ? {
                ...i,
                quantity: i.quantity + quantity,
              }
            : i
        );
      } else {
        return [
          ...prev,
          {
            ...item,
            quantity,
            status: "Preparing",
            timestamp,
            eta,
          },
        ];
      }
    });
  };

  const removeOrder = (name) => {
    setCartItems((prev) => prev.filter((i) => i.name !== name));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.status === "Preparing")
            return { ...item, status: "Out for Delivery" };
          if (item.status === "Out for Delivery")
            return { ...item, status: "Delivered" };
          return item;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
