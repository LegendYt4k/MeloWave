const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const embed = new MessageEmbed()
      .setTitle(`▼△ ${client.user.username} 𝙷𝚎𝚕𝚙 ▼△`)
      .setDescription(
        ` **Hello **<@${message.author.id}>**, I am <@${client.user.id}>**. \n\n**🎶 Free Music Bot For Your Server** \n\n**◤✧ ------------------------------ ✧◥**\n\n**🌐 Support Many Sources** \n\n\`🎵\`▼△ 𝙼𝚞𝚜𝚒𝚌 ▼△\n\n\`💫\`▼△ 𝙿𝚕𝚊𝚢𝚕𝚒𝚜𝚝 ▼△\n\n\`✨\`▼△ 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 ▼△\n\n\`⚙️\`▼△ 𝚂𝚎𝚝𝚝𝚒𝚗𝚐𝚜 ▼△\n\n\`❄️\`▼△ 𝙵𝚒𝚕𝚝𝚎𝚛𝚜 ▼△\n\n *Choose an category below to see commands* \n\n`,
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('▼△▼△ 𝙼𝚎𝚕𝚘𝚂𝚢𝚗𝚌 𝙷𝚎𝚕𝚙 ▼△▼△')
          .addOptions([
            {
              label: '𝙼𝚞𝚜𝚒𝚌',
              value: 'music',
              emoji: '🎵',
            },
            {
              label: '𝙵𝚒𝚕𝚝𝚎𝚛',
              value: 'filter',
              emoji: '❄️',
            },
            {
              label: '𝙸𝚗𝚏𝚘',
              value: 'info',
              emoji: '✨',
            },
            {
              label: '𝚂𝚎𝚝𝚝𝚒𝚗𝚐𝚜',
              value: 'settings',
              emoji: '⚙️',
            },
            {
              label: '𝙿𝚕𝚊𝚢𝚕𝚒𝚜𝚝',
              value: 'playlist',
              emoji: '💫',
            },
          {
            label: 'Invite Me',
            value: 'invite',
            emoji: '✉',
          },
            {
              label: '𝙷𝚘𝚖𝚎',
              value: 'home',
              emoji: '🏠',
            }
          ])
      )

    const m = await message.reply({ embeds: [embed], components: [row] })

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix}help & /help`)
          .addOptions([
            {
              label: '𝙼𝚞𝚜𝚒𝚌',
              value: 'music',
              emoji: '🎵',
            },
            {
              label: '𝙵𝚒𝚕𝚝𝚎𝚛',
              value: 'filter',
              emoji: '❄️',
            },
            {
              label: '𝙸𝚗𝚏𝚘',
              value: 'info',
              emoji: '✨',
            },
            {
              label: '𝚂𝚎𝚝𝚝𝚒𝚗𝚐𝚜',
              value: 'settings',
              emoji: '⚙️',
            },
            {
              label: '𝙿𝚕𝚊𝚢𝚕𝚒𝚜𝚝',
              value: 'playlist',
              emoji: '💫',
            },
            {
              label: 'Invite Me',
              value: 'invite',
              emoji: '✉',
            },
            {
              label: '𝙷𝚘𝚖𝚎',
              value: 'home',
              emoji: '🏠',
            }
          ])
      )


    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only ** ${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

    collector.on("collect", (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const options = interaction.values[0];
      let _commands;

      if (options === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('▼△ 🎵  𝙼𝚞𝚜𝚒𝚌 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 ▼△')
          .setFooter({ text: `Total ${_commands.length} Music commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'filter') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('▼△ ❄️ 𝙵𝚒𝚕𝚝𝚎𝚛 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 ▼△')
          .setFooter({ text: `Total ${_commands.length} Filter commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'playlist') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Playlist')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('▼△ 💫  𝙿𝚕𝚊𝚢𝚕𝚒𝚜𝚝 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 ▼△')
          .setFooter({ text: `Total ${_commands.length} Playlist commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'settings') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('▼△ ⚙️  𝚂𝚎𝚝𝚝𝚒𝚗𝚐𝚜 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 ▼△')
          .setFooter({ text: `Total ${_commands.length} Settings commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
        if (options === 'invite') {
          _commands = client.commands
            .filter((x) => x.category && x.category === 'invite')
            .map((x) => `\`${x.name}\``);
          editEmbed = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`**Click [Here](https://discord.com/api/oauth2/authorize?client_id=1134446602409484338&permissions=277041182784&scope=bot) To Invite Me Or Click Below**`)
            .setTitle('▼△ ✉ Invite Me ▼△')
            .setFooter({ text: `Total ${_commands.length} Settings commands.` });
          if (!m) return;
          return m.edit({
            embeds: [editEmbed],
            components: [row],
          });
        }
      }
      if (options === 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Information')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('▼△ ✨ 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 ▼△')
          .setFooter({ text: `Total ${_commands.length} Information commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }

      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    }
    )

  },
};