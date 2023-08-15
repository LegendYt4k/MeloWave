const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require("../../schema/setup");
const { trackStartEventHandler } = require("../../utils/functions");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo")

module.exports = {
    name: "playerCreate",

    /**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 */

    run: async (client, player) => {
        
        const web1 = client.channels.cache.get(client.config.plogs);

let name = client.guilds.cache.get(player.guildId).name;

const embed = new MessageEmbed()

.setColor(client.embedColor)

.setAuthor("Player Created", client.user.displayAvatarURL())

.setDescription(`ServerName: **${name}**`)

web1.send({embeds: [embed]});



        let guild = client.guilds.cache.get(player.guildId);
        if (!guild) return;
        
        const data = await db.findOne({ Guild: guild.id });
        if (!data) return;

        let channel = guild.channels.cache.get(data.Channel);
        if (!channel) return;

        let message;
        

            message = await channel.messages.fetch(data.Message, { cache: true });

        

        if (!message) return;
        const but1 = new MessageButton().setCustomId(`${message.guildId}pause`).setEmoji(`⏸️`).setStyle('SECONDARY').setDisabled(false)
        const but2 = new MessageButton().setCustomId(`${message.guildId}previous`).setEmoji(`⏮️`).setStyle('SECONDARY').setDisabled(false)
        const but3 = new MessageButton().setCustomId(`${message.guildId}skip`).setEmoji(`⏭️`).setStyle('SECONDARY').setDisabled(false)
        const but4 = new MessageButton().setCustomId(`${message.guildId}voldown`).setEmoji(`🔉`).setStyle('SECONDARY').setDisabled(false)
        const but5 = new MessageButton().setCustomId(`${message.guildId}volup`).setEmoji(`🔊`).setStyle('SECONDARY').setDisabled(false)

        const row = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)

        await message.edit({ content: "__**Join a voice channel and queue songs by name/url.**__\n\n", components: [row] })

    }
};