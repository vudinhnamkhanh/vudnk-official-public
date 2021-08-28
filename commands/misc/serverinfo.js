const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'serverinfo',
    aliases: ['svi', 'svinfo', 'si'],
    description: 'Discord guild info',
    execute(msg, args, client) {

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }

        let guild = client.guilds.cache.get(msg.guild.id)

        let channels = {
            category: msg.guild.channels.cache.filter(c => c.type == 'GUILD_CATEGORY').size,
            text: msg.guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').size,
            voice: msg.guild.channels.cache.filter(c => c.type == 'GUILD_VOICE').size
        }
        let totalChannels = channels.text + channels.category

        let memberCount = {
            total: msg.guild.memberCount,
            bots: msg.guild.members.cache.filter(member => member.user.bot).size
        }
        
        const embed = new MessageEmbed()
            .setColor(msg.member.displayHexColor)
            .setAuthor(`${msg.guild.name} (👑${client.users.cache.get(msg.guild.ownerId).tag})`, msg.guild.iconURL({ format: 'png', dynamic: true}))
            .setThumbnail(msg.guild.iconURL({ format: 'png', dynamic: true}))
            .addFields(
                {name: 'Member Count', value: `**🌐 Total**: ${memberCount.total}\n┣ 🧍 Humans: ${memberCount.total - memberCount.bots}\n┗ 🤖 Bots: ${memberCount.bots}`, inline: true},
                {name: 'Channels', value: `**🌐 Total**: ${totalChannels}\n┣ 🔢 Category: ${channels.category}\n┣ #️⃣ Text: ${channels.text}\n┗ 🎙️ Voice: ${channels.voice}`, inline: true},
                {name: 'Roles', value: `${msg.guild.roles.cache.size.toString()}`, inline: true},
                {name: 'Info', value: `
                    Verification Level: ${msg.guild.verificationLevel}
                    Vanity: ${msg.guild.vanityURLCode == null ? "No" : msg.guild.vanityURLCode}
                    Boosts: ${msg.guild.premiumSubscriptionCount} ${msg.guild.premiumTier == "TIER_3" ? "(MAX)" : `\u200b`}
                    ${msg.guild.features.includes('INVITE_SPLASH') == false ? "❌" : "✅"} Invite Splash
                    ${msg.guild.features.includes('ANIMATED_ICON') == false ? "❌" : "✅"} Animated Icon
                    ${msg.guild.features.includes('BANNER') == false ? "❌" : "✅"} Server Banner
                    ${msg.guild.features.includes('NEWS') == false ? "❌" : "✅"} News Channels
                    ${msg.guild.features.includes('PRIVATE_THREADS') == false ? "❌" : "✅"} Private Threads
                    ${msg.guild.explicitContentFilter == "DISABLED" ? "❌" : "✅"} Explicit Content Filter
                `, inline: true},

            )
            .setFooter(`ID: ${msg.guild.id} | Creation Date`)
            .setTimestamp(new Date(msg.channel.guild.createdAt))
        msg.reply({embeds: [embed]})
    }
}