const Database = require('simplest.db');

module.exports = {
    name: "prefix",
    description: "Đặt prefix bot cho riêng bạn",

    execute(msg, args, client) {
        if(!args[0]) return msg.reply({embeds: [{
            description: "Cung cấp prefix của bạn muốn đặt cho bạn.\n\n" + client.prefix + "prefix <KEY>",
            color: client.embed_colors.error
        }]})

        if(args[1]) return msg.reply({embeds: [{
            description: "Định dạng prefix không hợp lệ.",
            color: client.embed_colors.error
        }]})

        let data = new Database({path: "./database/prefix.json"});

        if(data.get(msg.author.id) == args[0]) return msg.reply({embeds: [{
            description: "Bạn đã đặt prefix này trước đó rồi.",
            color: client.embed_colors.error
        }]})

        if(msg.mentions.members.first() == client.user) return msg.reply({embeds: [{
            description: "Bạn không thể dùng bot làm prefix.",
            color: client.embed_colors.error
        }]})

        msg.reply({embeds: [{
            description: "Đã đặt prefix cho bạn là **" + args[0] + "**.",
            color: client.embed_colors.success
        }]})

        data.set(msg.author.id, args[0]);

    }
}