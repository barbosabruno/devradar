const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
  io = socketio(server);
  // listener (toda vez que receber uma conexão)
  io.on('connection', socket => {
    // console.log(socket.id);
    // console.log(socket.handshake.query); // params que são enviados do front-end
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });

    // Teste para enviar mensagem ao front-end real time
    // setTimeout(() => {
    //   socket.emit('message', 'Hello OmniStack');
    // }, 3000);
  });
};

// Filtra as conexões de um novo Dev cadastrado pelas coordenadas e tecnologias
// e retorna todas as conexões no raio de 10km
exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    // Compara as coordenadas do novo Dev cadastrado (coordinates)
    // com as coordenadas armazenadas em cada uma das conexões de WebSocket (connection.coordinates)
    // e verifica se a distãncia é menor que 10km (10);
    // E por fim, verifica se as tecnologias dos Devs se enquadram na pesquisa.
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item));
  });
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}
