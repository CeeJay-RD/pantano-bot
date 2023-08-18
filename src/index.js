import {Client } from 'discord.js'
import { config } from 'dotenv'

config();

const TOKEN = process.env.BOT_TOKEN
const client = new Client({intents: ['Guilds', 'GuildMessages']})

client.login(TOKEN)

client.on('ready', () => {
    console.log('Bot is online!')
})

client.on('messageCreate', () => {
    console.log('pon')
})
