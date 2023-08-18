import { SlashCommandBuilder } from '@discordjs/builders'


const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!');


    

export default pingCommand.toJSON();