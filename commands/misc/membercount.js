module.exports = {
    name: 'membercount',
    aliases: ['members', 'users', 'userscount', 'mcount', 'totalmembers', 'totalusers', 'mc'],
    description: 'Total members of guild',
    execute(msg) {
        msg.reply({embeds: [{
            color: "BLUE",
            description: `Total members: **${msg.guild.memberCount}**`
        }]})
    }
}