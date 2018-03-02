const app = require('./app');
const http = require('http');
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(port);