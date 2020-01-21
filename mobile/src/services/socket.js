import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.8:3333', {
  autoConnect: false
});

// listener do evento new-dev (quando o Dev é cadastrado no back-end)
function subscribeToNewDevs(subscribeCbFunction) {
  socket.on('new-dev', subscribeCbFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  socket.connect();

  socket.on('message', text => {
    console.log(text);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs
}