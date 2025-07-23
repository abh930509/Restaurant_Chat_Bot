const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./sockets/orderTracking");
require("./bot/index");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
