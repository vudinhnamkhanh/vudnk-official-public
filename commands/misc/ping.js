const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ping',
    blacklist_access: true,
    execute(msg, client) {
        msg.reply({embeds: [{
            color: 'GREEN',
            description: 'Đang tính toán...'
        }]}).then(m => {
			var ping = m.createdTimestamp - msg.createdTimestamp

            m.edit({embeds: [{
                color: "GREEN",
                fields: [
                    {name: "Độ trễ của VUDNK Official", value: ping + "ms"},
                    {name: "Độ trễ của API", value: msg.client.ws.ping + "ms"}
                ]
            }]})
		})
    }
}