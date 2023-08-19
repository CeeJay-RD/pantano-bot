import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders'
import { config } from 'dotenv';
config();

const APEX_TOKEN = process.env.APEX_TOKEN;


export default {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Returns current Apex Map'),

    async execute(interaction) {
        const loadingEmbed = new EmbedBuilder()
            .setDescription('Loading...')
            //.setColor('(13, 17, 23)'); 

        await interaction.reply({ embeds: [loadingEmbed] }); // Use reply instead of editReply

        try {
            const response = await fetch(`https://api.mozambiquehe.re/maprotation?auth=${APEX_TOKEN}`);
            const data = await response.json(); // Added await here
            const map = data.current.map;
            const image = data.current.asset
            const remainingTime = data.current.remainingTimer
            console.log(map)
            const mapEmbed = new EmbedBuilder()
                .setTitle(`Lo tigre se tan tirando en ${map}`)
                .setDescription('Cuidate que lo tigre andan sweaty y desacatao')
                .setImage(`${image}`)
                .setFooter({ text: `Le quedan ${remainingTime} al maldito mapa` });

            await interaction.editReply({ embeds: [mapEmbed] });
        } catch (error) {
            console.error(error);

            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('An error occurred while fetching map data.')

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};



