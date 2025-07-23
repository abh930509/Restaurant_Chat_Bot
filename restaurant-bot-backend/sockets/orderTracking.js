let io;

function initializeSocket(server) {
  const socketIo = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io = socketIo;

  io.on("connection", (socket) => {
    console.log("🔗 New client connected:", socket.id);

    socket.on("trackOrder", (orderId) => {
      socket.join(orderId);

      setTimeout(() => {
        io.to(orderId).emit("orderStatusUpdate", {
          orderId,
          status: "Preparing",
        });
      }, 3000);

      setTimeout(() => {
        io.to(orderId).emit("orderStatusUpdate", {
          orderId,
          status: "Out for delivery",
        });
      }, 10000);

      setTimeout(() => {
        io.to(orderId).emit("orderStatusUpdate", {
          orderId,
          status: "Delivered",
        });
      }, 18000);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = {
  initializeSocket,
};
