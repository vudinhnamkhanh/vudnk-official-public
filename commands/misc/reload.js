const fs = require('fs')

module.exports = {
    name: 'reload',
    aliases: ['rl'],
    usage: '<command>',
    execute(msg, args, client) {
        if(!args[0])
            return msg.channel.send('Hãy nhập một hay nhiều lệnh để reload.')

        try {
            let reloaded = []
            args.forEach(toreload => {
                fs.readdirSync('./commands').forEach(dir => {
                    fs.readdir(`./commands/${dir}`, (err, files) => {
                        if(err) throw err;
                        let reload = files.find(f => f.split('.')[0] == toreload)
                        if(reload) {
                            console.log(dir, reload)
                            delete require.cache[require.resolve(`../../commands/${dir}/${reload.split('.')[0]}`)]

                            const cmd = require(`../../commands/${dir}/${reload.split('.')[0]}`);
			                client.commands.set(cmd.name, cmd)
                        }
                    })
                })
                reloaded.push(toreload)
            })
            
            msg.reply({embeds: [{
                color: client.embed_colors.success,
                description: `Đã tải lại lệnh **${reloaded.join('** **')}**!`
            }]})
		} catch(err) {console.error(err)}
    }
}