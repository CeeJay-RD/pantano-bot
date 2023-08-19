import { Client, GatewayIntentBits, Events } from 'discord.js';
import { config } from 'dotenv';
import { REST, Routes } from 'discord.js';
import  pingCommand  from './commands/ping.js'
import currentMap from './commands/currentMap.js'

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const APEX_TOKEN = process.env.APEX_TOKEN;


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN)

client.on('ready', () =>  {console.log(`${client.user.tag} has logged in!`)})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (interaction.commandName === 'map') {
    currentMap.execute(interaction)
  }
})


async function main() {
    const commands = [

      pingCommand,
      currentMap.data,  
    ];
    
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
      });
      client.login(TOKEN);
    } catch (err) {
      console.log(err);
    }
  }
  
  main();