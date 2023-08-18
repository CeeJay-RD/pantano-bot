import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { REST } from 'discord.js';

config();

const TOKEN = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const rest = REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN)

client.on('ready', () =>  {console.log(`${client.user.tag} has logged in!`)})

async function main() {
    const commands = [
      BanCommand,     
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