require('dotenv').config()

const { Client } = require('discord.js')
const client = new Client()
const sort = require('./commands/sort')
const greetings = require('./events/greetings')
const newMemberMessage = require('./events/newMember')
const commands = require('./commands/commands')
const weatherReport = require('./commands/weatherReport')

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}`)
})

client.on('message', msg => {
  sort(msg)
})

client.on('message', msg => {
  commands(msg)
})

client.on('message', msg => {
  greetings(msg)
})

client.on('message', msg => {
  weatherReport(msg)
})

client.on('guildMemberAdd', member => {
  newMemberMessage(member)
});


client.login(process.env.TOKEN_DISCORD)