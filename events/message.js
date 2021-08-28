const Database = require('simplest.db')

module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        let dataPrefix = new Database({path: "./database/prefix.json"}).get(msg.author.id);

        const prefix = dataPrefix || client.prefix || new Database({path: `./database/guilds/${msg.guild.id}.json`}).get("prefix")

        if(msg.author.bot || msg.author == client.user) return;

        if (msg.content == `<@!${client.user.id}>` && !msg.author.bot) 
            return msg.reply({embeds: [{
                color: "#FF1493",
                description: `Prefix của bạn là **${prefix}**`
            }]})
        
        if(!msg.content.startsWith(prefix)) return;

        let uid = msg.author.id
        const args = msg.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if(!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

        let commands = client.commands.get(command) 
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))


        if(!client.admin.includes(msg.author.id)) {
            if(commands.disabled == true) 
                return msg.reply({embeds: [{
                    color: client.embed_colors.error,
                    description: 'Lệnh **' + command + '** đã bị tắt!'
                }]})

            if(commands.admin == true)
                return msg.reply({embeds: [{
                    color: client.embed_colors.warning,
                    description: 'Lệnh **' + command + '** chỉ dành cho Admin!'
                }]})

            if((!commands.blacklist_access && client.blacklist.keys.includes(msg.author.id)) == true)
                return msg.reply({embeds: [{
                    color: client.embed_colors.blacklist,
                    description: 'Lệnh **' + command + '** không dành cho người bị blacklist!'
                }]})

            if(client.cooldowns.has(`${uid} | ${commands.name}`))
                return msg.reply({embeds: [{
                    color: client.embed_colors.warning,
                    description: `Bạn phải chờ **${(client.cooldowns.get(`${uid} | ${commands.name}`)/1000).toFixed(2)} giây** để tiếp tục sử dụng lệnh này.`
                }]})
        }

        console.log(`[${new Date(Date.now()).toUTCString()}] (${msg.guild.name} || #${msg.channel.name}) << ${msg.author.tag} || ${msg.author.id} >> ${msg.content}`)

        try {
            if(commands.cooldown && client.cooldowns.has(`${uid} | ${commands.name}`) == false) {
                await client.cooldowns.set(`${uid} | ${commands.name}`, commands.cooldown * 1000);


                for(let t = 1; t <= client.cooldowns.get(`${uid} | ${commands.name}`); t++) {
                    setTimeout(() => {
                        let cd = client.cooldowns.get(`${uid} | ${commands.name}`)
                        if(cd <= 0) return;

                        cd = cd - 1
                        client.cooldowns.set(`${uid} | ${commands.name}`, cd)
                    }, t)
                }

                setTimeout(() => {
                    client.cooldowns.delete(`${uid} | ${commands.name}`)
                }, client.cooldowns.get(`${uid} | ${commands.name}`))

            }

            commands.execute(msg, args, client);
        } catch (error) {
            console.error(error);
            msg.reply({embeds: [{
                color: client.embed_colors.error,
                description: `Đã xảy ra lỗi khi đang sử dụng lệnh **${command}**`
            }]});
        }
    }
}