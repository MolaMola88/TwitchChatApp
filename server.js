require("dotenv").config();


const twitchUserName = process.env.TWITCH_BOT_USERNAME;
const twitchToken = process.env.TWITCH_OAUTH_TOKEN;

//Criação do servidor no express
const express = require('express');
const app = express();

// Faz um mapa para os arquivos estaticos /static olha dentro da pasta public
app.use('/static', express.static('public'));

const http = require('http');
//O app meio que controla as funções etc dentro do server
const server = http.createServer(app);

//O servidor http é passado como parametro pro servidor io
const { Server } = require("socket.io");
const socket = new Server(server);

const tmi = require('tmi.js');

const twitch = new tmi.Client({
    connection: {
        reconnect: true
    },
    options: {
        debug: true
    },
    identity: {
        username: twitchUserName,
        password: twitchToken
    },
    channels: ['PauloSGarciaJ']
});

twitch.connect();

//O app ao atingir a home do website é chamado res que envia pra página o arquivo html pro servidor
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

socket.on('connection', (socket) => {
    twitch.on('message', (channel, tags, message, self) => {
        var payload = { "usuario": tags.username, "msg": message };
        socket.emit('chat message', payload);
    });
});

socket.on('disconnect', function () {
    socket.removeAllListeners("chat message");
})


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:PORT');
})
