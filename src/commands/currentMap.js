import { SlashCommandBuilder } from '@discordjs/builders'

const currentMap =  new SlashCommandBuilder()
    .setName('currentmap')
    .setDescription('Displays information on Apex Legends current map')

export default currentMap.toJSON()