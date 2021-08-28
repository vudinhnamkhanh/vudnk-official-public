const Database = require('simplest.db');
const moment = require('moment')
const db = new Database({
    path: './database/blacklist.json'
})
module.exports = {
	name: 'blacklist',
	aliases: ['b', 'bl'],
    description: 'Blacklist utilities.',
    usage: '<option> [user]',
    admin: true,
	execute(msg, args, client) {
		function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000)
				
            return days + (days == 1 ? " day" : " days") + " ago";
        }


		let types = ['add', 'remove', 'list', 'info']
		if(!args[0] || !types.includes(args[0].toLowerCase())) return msg.reply(`**Please input a valid option:** \`add\` \`remove\` \`list\``)
		let type = args[0].toLowerCase()
		let user
		if(args[1]) {
    		user = args[1].replace('<@!', '').replace('>', '')
		} else if(!args[1] && type != 'list') return msg.reply("Please mention a user to blacklist, unblacklist or view infos on their blacklist.")
		const already = Object.keys(db.get('users.blacklisted')).includes(user)

	

		const checkifBlacklisted = (userid) => {
			let check = Object.keys(db.get('users.blacklisted')).includes(userid)
			let tag = client.users.cache.find(user => user.id == userid).tag
			switch(check) {
				case true:
					return tag + " Oops ! Bạn đang nằm trong danh sách đen !"
					break;
				case false:
					return tag + " Chúc mừng ! Bạn không nằm trong danh sách đen !"
					break;
				default:
					return tag + "Không thể xác định bạn có năm trong danh sách đen hay không :v"
			}
		}

		switch(type) {
			case 'add':
				if(already) {
					return msg.reply('Người dùng này đã được đưa vào danh sách đen.')
				} else {
					msg.reply({embeds: [{
                        title: "Người dùng đã được đưa vào danh sách đen !",
                        color: client.embed_colors.blacklist,
                        description: `<@!${user}> (${user})\n**Lí do**: ${args[2] ? args.splice(2).join(' ') : "Blacklisted."}`,
                        timestamp: new Date()
                    }]})
    				db.set(`users.blacklisted.${user}`, {
						reason: args[2] ? args.splice(2).join(' ') : "Blacklisted.",
						time: Date.now()
					})
				}
				break;
			case 'remove':
				if(!already) {
					return msg.reply('Người dùng này đã có tên trong danh sách đen !')
				} else {
					msg.reply({embeds: [{
                        title: "Người dùng đã được xóa khỏi danh sách đen !",
                        color: "WHITE",
                        description: `<@!${user}> (${user}) đã được xóa khỏi danh sách đen.`,
                        timestamp: new Date()
                    }]})
    				db.delete(`users.blacklisted.${user}`)
				}
				break;
			case 'list':
				let cc = ''
				let count = 0
				cc = '\`' + Object.keys(db.get('users.blacklisted')).join('\` \`') + '\`'
        		Object.keys(db.get('users.blacklisted')).forEach(key => {
					count++
				})
        		msg.reply({embeds: [{
					color: 'BLACK',
					title: 'Danh sách người dùng trong danh sách đen theo ID[' + count + ']',
					description: cc ? cc.replace(/undefined/g, '') : "Không có người dùng trong danh sách đen",
					footer: { text: checkifBlacklisted(msg.author.id) }
				}]})
				break;
			case 'info':
				if(!already)
					return msg.reply('Người dùng này chưa được thêm vào danh sách đen !')
				var bl = db.get(`users.blacklisted.${user}`)
				msg.reply({embeds: [{
					color: 'RED',
					title: client.users.cache.find(u => u.id == user).tag,
					description: `ID: ${user}\nLí do: ${bl.reason}\nĐược thêm vào danh sách đen lúc: ${new Date(bl.time).toUTCString()} (${moment(new Date(bl.time)).fromNow()})`
				}]})
                
		}
	}
}