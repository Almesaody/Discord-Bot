const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "📃┆Changelogs",
                value: '10/12/2022 - updated the bot to the latest of discord.js (v14)',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}