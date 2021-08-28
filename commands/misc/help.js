const { MessageEmbed } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'help',
    aliases: ['cmd', 'cmds', 'commands', 'lenh'],
    disabled: false,
    async execute(msg, args, client) {
        msg.channel.send('VUDNK Official đã gửi hướng dẫn cho bạn ở DM !')
        const help = {
            getCommandsFromCategory: function(cat, join = false) {
                let cmds = []
                fs.readdirSync(`commands/${cat}`).forEach(file => {
                    cmds.push(file.split('.')[0])
                })
                if(join == true)
                    return `\`${cmds.join('\` \`')}\`` 
                else if(join == false)
                    return cmds
            },
            
            getTotalNofCommands: function() {
                let amt = 0
                fs.readdirSync('commands').forEach(dir => {
                    amt = amt + this.getCommandsFromCategory(dir, false).length
                })
                return amt
            },

            getCategories: function(n = false) {
                let cats = []
                fs.readdirSync('commands').forEach(cat => cats.push(cat))
                if (n == false) return cats
                if (n == true) return cats.length
            }
        }

        const base_embed = new MessageEmbed()
            .setColor(msg.member.displayHexColor)
            .setAuthor('VUDNK Official', client.user.avatarURL({ format : 'jpg', dynamic: true, size: 256 }))
            .setFooter(msg.author.tag)
            .setTimestamp()

        if(args[0]) {
            args[0] = args[0].toLowerCase()
            let cmd = client.commands.get(args[0]) 
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))

            const info_embed = await new MessageEmbed(base_embed)
                .addFields(
                    {
                        name: 'Info',
                        value: `
                            **Name**: ${cmd.name}
                            **Description**: ${!cmd.description ? "No description." : cmd.description}
                            **Aliases**: ${(cmd.aliases || Array.isArray(cmd.aliases)) == false ? "No aliases." : `\`${cmd.aliases.join('\` \`')}\``}
                            **Usage**: ${!cmd.usage ? `${client.prefix}${cmd.name}` : `${client.prefix}${cmd.name} ${cmd.usage}`}
                            **Cooldown**: ${!cmd.cooldown ? `0` : cmd.cooldown}s
                        `
                    },
                    {
                        name: "Accessibility",
                        value: `
                            Disabled? ${cmd.disabled ? "✅" : "❌"}
                            Admin Only? ${cmd.admin ? "✅" : "❌"}
                            Blacklisted users can use this command? ${cmd.blacklist_access ? "✅" : "❌"}
                        `
                    }
                )

            msg.reply({embeds: [info_embed]})
        } else {
            const help_embed = await new MessageEmbed(base_embed)
                .setTitle('Help Menu')
                .setDescription(`**Prefix**: \`${client.prefix}\` | **${help.getCategories(true)}** categories | **${help.getTotalNofCommands()}** commands`)

            await help.getCategories().forEach(cat => {
                help_embed.addField(`${cat.toUpperCase()} [${help.getCommandsFromCategory(cat).length}]`, help.getCommandsFromCategory(cat, true))
            })

            msg.author.send({embeds: [help_embed]})
        }
    }
}