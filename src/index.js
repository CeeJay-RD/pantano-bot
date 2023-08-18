import {Client } from 'discord.js'
import { config } from 'dotenv'
import { REST } from 'discord.js';

config();

const TOKEN = process.env.BOT_TOKEN
const client = new Client({intents: ['Guilds', 'GuildMessages']})

const rest = REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN)

client.on('ready', () =>  {console.log(`${client.user.tag} has logged in!`)})

