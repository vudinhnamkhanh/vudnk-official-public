const { writeFile } = require('fs')
const db = require('simplest.db')

module.exports = {
    name: 'guildCreate',
    execute(guild, client) {
        var a = 0
        guild.channels.cache.map((c) => {
            if(a >= 1) return
            var channel = c
                if (channel.type.toLowerCase().includes("text")) {
                    if ((channel.permissionsFor(client.user).has("VIEW_CHANNEL") && channel.permissionsFor(client.user).has("SEND_MESSAGES")) === true) {
                        channel.send(`
Xin chào! Tôi là VUDNK Official.

Nếu bạn muốn tương tác với tôi, hãy dùng prefix mặc định \`;;\`, hoặc bạn có thể làm prefix riêng cho mình bằng lệnh \`>prefix <prefix>\`. Sử dụng lệnh \`;help\` để lấy thêm thông tin.
                        `);

                        let data = {
                            name: guild.name,
                            id: guild.id,
                            prefix: client.prefix
                        }
                
                        writeFile(`database/guilds/${guild.id}.json`, JSON.stringify(data), (err) => {
                            if(err) console.log(err) 
                            else {
                                console.log(`Successfully written data for Guild: ${guild.name} (${guild.id})`)
                            }
                        })
                    }
            }
            a = a + 1
        });
    }
}