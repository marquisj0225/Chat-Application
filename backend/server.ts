const app = require('./app');
const http = require('http');
const debug = require('debug')('server:server');
const context = require('./context');

const server = http.createServer(app);
const socketIO = require('./socket.io')(server);
context.io = socketIO;
const port = app.get('port');
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

server.listen(port, () => {
  console.log('Server started and listening on port ' + port);
});
server.on('error', onError);
server.on('listening', onListening);
