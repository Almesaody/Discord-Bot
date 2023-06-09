const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    var channelName = await client.getTemplate(interaction.guild);
    channelName = channelName.replace(`{emoji}`, "🔊")
    channelName = channelName.replace(`{name}`, `Voice Channels: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size || 0}`)

    await interaction.guild.channels.create({
        name: channelName,
        type: 'GUILD_VOICE', permissionOverwrites: [
            {
                deny: [Discord.PermissionsBitField.Flags.Connect],
                id: interaction.guild.id
            },
        ],
    }).then(async (channel) => {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.VoiceChannels = channel.id;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    VoiceChannels: channel.id
                }).save();
            }
        })

        client.succNormal({
            text: `Voice channel count created!`,
            fields: [
                {
                    name: `📘┆Channel`,
                    value: `${channel}`
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}