import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders'
import { config } from 'dotenv';
config();

const APEX_TOKEN = process.env.APEX_TOKEN;

function mapImageCalc (map) {

    switch(map) {
        case 'Olympus':
            return 'https://th.bing.com/th/id/OIP.Mo7haGmf1hd1QCL6tC09MQHaEK?pid=ImgDet&rs=1'
            break;
        case 'Kings Canyon':
            return 'https://cdn.mos.cms.futurecdn.net/jhC2CL8qGkMuyDYHm2L3RF-970-80.jpg'
            break;
        case 'Broken Moon':
            return 'https://th.bing.com/th/id/OIP.PDme1Vhq_371DOjpyT4zCgHaEK?pid=ImgDet&rs=1'
            break;
        case 'Worlds Edge':
            return 'https://th.bing.com/th/id/R.12dd929aaa71be9c779cd15789fb856d?rik=L%2bzc3KcVOy39LA&pid=ImgRaw&r=0'
            break;
        default:
            return 'https://th.bing.com/th/id/R.002f5facdd6a1679fe236242c9c37c7f?rik=okrFlTNpmCdZ2w&pid=ImgRaw&r=0'
    }

}

export default {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Returns current Apex Map'),

    async execute(interaction) {
        const loadingEmbed = new EmbedBuilder()
            .setDescription('Loading...')
            .setColor(0x353945) 


        await interaction.reply({ embeds: [loadingEmbed] }); // Use reply instead of editReply

        try {
            const response = await fetch(`https://api.mozambiquehe.re/maprotation?auth=${APEX_TOKEN}`);
            const data = await response.json(); // Added await here
            const map = data.current.map;
            const remainingTime = data.current.remainingTimer
            const remainingMinutes = remainingTime.slice(3, 8)
            const nextMap = data.next.map
            

            const mapEmbed = new EmbedBuilder()
                .setTitle(`Lo tigre se tan tirando en ${map}`)
                .setDescription('Cuidate que lo tigre andan sweaty y desacatao')
                .setAuthor({name: 'El Guare', iconURL: 'https://th.bing.com/th/id/R.0882828d142d6b763dcfc987aa7cad39?rik=l6YT%2baxLjsLb9w&riu=http%3a%2f%2f4.bp.blogspot.com%2f-MbxJmkP6Wt4%2fULNdl69PpvI%2fAAAAAAAAAJ4%2f4b8_ijzV-So%2fs1600%2fpaloma-blanca%2bcuriosa.jpg&ehk=7bNvNyATRRiEpkJPvi0AuRQ%2bVc8bFM71BcxpRIa%2bkIA%3d&risl=&pid=ImgRaw&r=0'})
                .setImage(`${mapImageCalc(map)}`)
                .setColor(0xf08d49)
                .addFields([
                    { name: 'Lo minuto que le quedan', value: `${remainingMinutes} ` },
                    { name: 'El proximo mapa', value: `${nextMap} ` },
                ])
                .setFooter({ text: `Te quiero <3` })
                

            await interaction.editReply({ embeds: [mapEmbed] });
        } catch (error) {
            console.error(error);

            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('An error occurred while fetching map data.')
                .setColor(0xfb467b)
                
            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};



