require("dotenv").config();

const tmi = require('tmi.js');

const twitchUserName = process.env.TWITCH_BOT_USERNAME;
const twitchToken = process.env.TWITCH_OAUTH_TOKEN;

//Criação do servidor no express
const express = require('express');
const app = express();
const http = require('http');
//O app meio que controla as funções etc dentro do server
const server = http.createServer(app);

//O servidor http é passado como parametro pro servidor io
const { Server } = require("socket.io");
const io = new Server(server);

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
	options: { debug: true },
	identity: {
		username: twitchUserName,
		password: twitchToken
	},
	channels: [ 'PauloSGarciaJ' ]
});

client.connect();

//O app ao atingir a home do website é chamado res que envia pra página o arquivo html pro servidor
app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {  
    client.on('message', (channel, tags, message, self) => {   
        io.emit('chat message', message);  
    });
});

server.listen(process.env.PORT || 3000, () => {  
    console.log('listening on *:PORT');
})