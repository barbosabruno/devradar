const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);
// Essa função deve ser chamada após instanciar o server, ex: const server = http.Server(app);
setupWebSocket(server);

// connection: mongodb+srv://<user>:<password>@omnistackcluster-mnod3.mongodb.net/<database_name>?retryWrites=true&w=majority
mongoose.connect('connection', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// liberar o acesso externo para todo tipo de aplicação passando apenas cors()
// -- cors recebe args: cors({ origin: 'http://localhost:3000' })
app.use(cors());
// Informa ao express que as requisições serão realizadas no formato json
// Deve ser declarado antes das rotas
app.use(express.json());
app.use(routes);


server.listen(3333);
