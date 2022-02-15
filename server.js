require("dotenv").config();

const tmi = require('tmi.js');

const twitchUserName = process.env.TWITCH_BOT_USERNAME;
const twitchToken = process.env.TWITCH_OAUTH_TOKEN;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
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

app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {  
    client.on('message', (channel, tags, message, self) => {   
        io.emit('chat message', message);  
    });
});

server.listen(process.env.PORT || 5000, () => {  
    console.log('listening on *:3000');
})