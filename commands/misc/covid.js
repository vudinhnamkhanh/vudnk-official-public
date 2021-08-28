const superagent = require('superagent')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'covid',
    execute(msg, args) {
        var formatNum = int => {
            return new Intl.NumberFormat().format(int)
        }
        
        if(!args[0] || ['all', 'world', 'global', 'globe'].includes(args[0].toLowerCase())) {
            return superagent.get('https://disease.sh/v3/covid-19/all/').end((err, data) => {
                var stats = data.body

                const embed_main = new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor('Covid-19 Stats #stayhome', 'https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png')
                    .setThumbnail('https://cdn.discordapp.com/attachments/855395777089110026/874981299306266624/USBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB4cr4X8Al2P8RwdLK2kAAAAASUVORK5CYII.png')
                    .setTitle(`Thế giới`)
                    .setDescription(`**${stats.affectedCountries} đất nước** đang chịu ảnh hưởng.`)
                    .addFields(
                        {name: 'Tổng ca mắc', value: `${formatNum(stats.cases)} (+${formatNum(stats.todayCases)})\n**Đang nhiễm**: ${formatNum(stats.active)}\n**Nguy kịch**: ${formatNum(stats.critical)}`, inline: true},
                        {name: 'Đã hồi phục', value: `${formatNum(stats.recovered)} (+${formatNum(stats.todayRecovered)})`, inline: true},
                        {name: 'Người chết', value: `${formatNum(stats.deaths)} (+${formatNum(stats.todayDeaths)})`}
                    )
                    .setFooter('Nguồn: Disease.sh | Cập nhật:')
                    .setTimestamp(new Date(stats.updated))
                msg.reply({embeds: [embed_main]})
            })
        }

        superagent.get('https://disease.sh/v3/covid-19/countries/' + encodeURIComponent(args.join(' '))).end((err, data) => {
            var stats = data.body

            if(stats.message) {
                const embed_error = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor('Covid-19 Stats', 'https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png')
                    .setThumbnail('https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png')
                    .setDescription(stats.message)
                msg.reply({embeds: [embed_error]})
                } else {
                    superagent.get('https://restcountries.eu/rest/v2/name/' + encodeURIComponent(stats.country)).end((err, datac) => {
                        const embed_main = new MessageEmbed()
                            .setColor('RED')
                            .setAuthor('Covid-19 Stats #stayhome', 'https://cdn.discordapp.com/attachments/795842485133246514/856490124871467038/COVID-19-1.png')
                            .setThumbnail(`https://www.countryflags.io/${datac.body[0]['alpha2Code']}/flat/64.png`)
                            .setTitle(`${stats.country} (${stats.countryInfo._id})`)
                            .addFields(
                                {name: 'Tổng cộng', value: `${formatNum(stats.cases)} (+${formatNum(stats.todayCases)})\n**Active**: ${formatNum(stats.active)} \n**Critical**: ${formatNum(stats.critical)}`, inline: true},
                                {name: 'Đã hồi phục', value: `${formatNum(stats.recovered)} (+${formatNum(stats.todayRecovered)})`, inline: true},
                                {name: 'Người chết', value: `${formatNum(stats.deaths)} (+${formatNum(stats.todayDeaths)})`}
                            )
                            .setFooter('Data from Disease.sh | Updated:')
                            .setTimestamp(new Date(stats.updated))

                        msg.reply({embeds: [embed_main]})
                    })
            }
            
        })

    }
}