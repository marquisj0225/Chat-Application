const { Server } = require('socket.io');

export function createSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  return io;
}

module.exports = createSocketIO;
