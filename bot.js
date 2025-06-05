// Import the discord.js module
const { Client, Intents } = require('discord.js');

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// Login to Discord with your client's token
// IMPORTANT: Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login('YOUR_BOT_TOKEN');

// Example of a simple command listener
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong.');
    }
});
