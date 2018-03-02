const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = require('socket.io').listen(server);

server.listen(port);