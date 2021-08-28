require('dotenv').config({path: './.env'})

const { Client, Collection, Intents } = require('discord.js'),
    fs = require('fs'),
    config = require('./config.json'),
    Database = require('simplest.db'),
    blacklist = new Database({path: './database/blacklist.json'})

require("discord-banner")()
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"], allowedMentions: { parse: ['users', 'roles'], repliedUser: false }})

client.commands = new Collection()
client.aliases = new Collection()
client.cooldowns = new Map()
client.prefix = config.prefix
client.admin = config.admin
client.blacklist = blacklist
client.embed_colors = config.embed_colors

const events = fs.readdirSync('./events')

fs.readdirSync('commands').forEach(dir => {
    fs.readdirSync('commands/' + dir).forEach(file => {
        file = file.split('.')[0]
        const cmd = require(`./commands/${dir}/${file}`)

        client.commands.set(cmd.name, cmd)


        console.log(`${dir}/${file} | ✅`)
    })
})


for (const file of events) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(`events/${event.name} | ✅`)
}


client.login(process.env.TOKEN, e => {console.error(e)})