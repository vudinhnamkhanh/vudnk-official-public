const { MessageEmbed } = require("discord.js")
const prettyms = require("pretty-ms")
const os = require('os')
module.exports = {
    name: 'botinfo',
    aliases: ['bi'],
    description: 'Info about bot.',
    execute(msg, args, client) {
        var memUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024),
			totalMem = Math.ceil(os.totalmem() / 1024 / 1024),
			freemem = Math.round(os.freemem() / 1024 / 1024),
			memPerc = Math.floor(memUsage / totalMem),
			ramUsage = Math.trunc(Math.round(process.cpuUsage().system) / 1024 / 1024 / 1024),
			uptime = prettyms(process.uptime() * 1000),
			cpuName = os.cpus()[0].model, 
            cpuSpeed = os.cpus()[0].speed

        const embed = new MessageEmbed()
            .setColor(msg.member.displayHexColor)
            .setAuthor('VUDNK Official', client.user.avatarURL({ format : 'jpg', dynamic: true, size: 256 }), 'https://github.com/cart69420/cartbot-2/')
            .setDescription(`
            **Name**: ${client.user.tag}
            **ID**: ${client.user.id}
            `)
            .addFields(
                {name: `**🖥️ Total Guilds**: ${client.guilds.cache.size}`, value: `
                **┗ 🌐 Channels**: ${client.channels.cache.size}
                    \u2800\u2800**┣ 🔢 Category**: ${client.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
                    \u2800\u2800**┣ #️⃣ Text**: ${client.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                    \u2800\u2800**┗ 🎙️ Voice**: ${client.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                `, inline: true},
                {name: `**🧍 Total Users**: ${client.users.cache.size}`, value: `
                    \u2800\u2800**┣ 🧍 Humans**: ${client.users.cache.filter((u) => !u.bot).size}
                    \u2800\u2800**┣ 🤖 Bots**: ${client.users.cache.filter((u) => u.bot).size}
                `, inline: true},
                {name: 'Info', value: `
                    **Uptime**: \n${uptime}
                    **Ping**: ${client.ws.ping}
                    **Node.js**: ${process.version}
                    **Discord.js**: ${require('../../package.json').dependencies["discord.js"]}
                `, inline: true},
                {name: 'Hosting', value: `
                    **Platform**: ${os.platform()} **OS**: ${os.type()}
                    **Memory Usage**: ${memUsage} MB (${memPerc}%)
                    **Other Processes**: ${totalMem - freemem - memUsage} MB
                    **Free Memory**: ${freemem} MB
                    **Total Memory**: ${totalMem} MB
                    **CPU Model**: ${cpuName}
                `}

            )
            .setFooter(`Registration Date: `)
            .setTimestamp(new Date(client.user.createdAt))
        msg.reply({embeds: [embed]})
        //console.log(client.stickers.cache.size)
    }
}