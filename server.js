require("dotenv").config();

const tmi = require('tmi.js');

const twitchUserName = process.env.TWITCH_BOT_USERNAME;
const twitchToken = process.env.TWITCH_OAUTH_TOKEN;

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

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message === 'Oi' || message === 'oi') {
		// "@alca, heya!"
	    client.say(channel, `@${tags.username}, Olá, seja bem vindo!`);
	}
    if(message === 'Hi' || message === 'Hello') {
		// "@alca, heya!"
	    client.say(channel, `@${tags.username}, Welcome!`);
    }
    //Hnadler
    if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	//if(command === 'echo') {
		//client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	//}
});