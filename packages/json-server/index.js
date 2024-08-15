const http = require('http');
// ======================================================
const app = require('./src/app');

// =========== Create server with HTTP module ===========

const options = {};

const PORT = 5000;
const server = http.createServer(options, app);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
