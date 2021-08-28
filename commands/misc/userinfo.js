const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'profile', 'pf', 'user', 'whois'],
    description: 'gets info about a specific user',
    usage: '<user(optional)>',
    execute(msg, args, client) {
        let user
        if(!args[0]) user = msg.member
        else user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || msg.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        let userid = user.user.id
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }

        function getTime(unix) {
            var dt = new Date(unix)

            return `${
                dt.getHours().toString().padStart(2, '0')}:${
                dt.getMinutes().toString().padStart(2, '0')}:${
                dt.getSeconds().toString().padStart(2, '0')
            }`
        }



        let tag = user.user.tag
        if(user.user.id == '806808416621559828') tag = '[DEVELOPER] ' + tag
        if(user.user.id == '453829936927735819') tag = '[AUTHOR] ' + tag
        if(user.user.id == '425599739837284362') tag = '[AUTHOR] ' + tag
        if(user.user.bot) tag = '[BOT] ' + tag

        let roles = user._roles
            if(roles.length == 0) {
                roles = '\u2800'
            } else roles = `<@&${user._roles.join('> <@&')}>`


        const embed = new MessageEmbed()
            .setColor(user.displayHexColor)
            .setAuthor(`${tag} (${user.id})`, msg.client.guilds.resolve(msg.guild.id).members.resolve(userid).user.avatarURL({ format : 'jpg', dynamic: true }))
            .setThumbnail(msg.client.guilds.resolve(msg.guild.id).members.resolve(userid).user.avatarURL({ format : 'jpg', dynamic: true }))

            .addFields(
                {name: 'Registered', value: `${new Date(user.user.createdAt).toUTCString().substr(0, 16)} ${getTime(user.user.createdAt)} (${checkDays(new Date(user.user.createdAt))})`, inline: true},
                {name: 'Joined', value: `${new Date(user.joinedTimestamp).toUTCString().substr(0, 16)} ${getTime(user.joinedTimestamp)} (${checkDays(new Date(user.joinedTimestamp))})`, inline: true},
                {name: '\u2800', value: '\u2800', inline: true},
                {name: 'Nickname', value: (user.nickname == null ? "No nicknames." : user.nickname), inline: true},
                //{name: 'Banner', value: `[Click me!](${user.user.bannerURL()})`, inline: true},
                {name: `Roles [${user._roles.length}]`, value: roles},
                //{name: 'Permissions []'}
            )
            .setFooter(user.user.id)
            .setTimestamp()
            msg.reply({embeds: [embed]})
    }
}