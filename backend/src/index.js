const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// faz com que o server http (app) ouça o protocolo WS (requisições real time)
const server = require('http').Server(app);
const io = require('socket.io')(server);

// conecta no banco remoto do site mlab
mongoose.connect('mongodb://backend:backend123@ds221435.mlab.com:21435/backend-nodejs', 
    {
        useNewUrlParser: true
    }
);

// middleware que permite abrir a requisição para adicionar novas infos
app.use((req, res, next) => {
    req.io = io; // req será acessivel em todos os locais do código

    return next(); // serve para seguir com a requisição adiante apos adicionar novas infos
})

app.use(cors());
app.use(express.json()); // informa que o conteudo a ser enviado usando o HTTP precisa estar em JSON
app.use(require('./routes')); 

server.listen(3000, () => {
    console.log("Server started on port 3000");
});