const BASE_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const getUserProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const fetchMenu = async () => {
  const res = await fetch(`${BASE_URL}/menus`);
  return res.json();
};

export const fetchRestaurants = async () => {
  const res = await fetch(`${BASE_URL}/restaurants`);
  return res.json();
};

export const sendBotMessage = async (text) => {
  const res = await fetch(`${BASE_URL}/bot/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

export const placeOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const getOrders = async (userId) => {
  const res = await fetch(`${BASE_URL}/orders/user/${userId}`);
  return res.json();
};

export const cancelOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });
  return res.json();
};

export const makeReservation = async (data) => {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getReservations = async (userId) => {
  const res = await fetch(`${BASE_URL}/reservations/user/${userId}`);
  return res.json();
};

export const payNow = async (paymentInfo) => {
  const res = await fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentInfo),
  });
  return res.json();
};

export const getRecommendations = async (userId) => {
  const res = await fetch(`${BASE_URL}/recommendations/${userId}`);
  return res.json();
};
