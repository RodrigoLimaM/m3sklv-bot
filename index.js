const { Client } = require('discord.js')
const client = new Client()
const sort = require('./commands/sort')

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}`)
})


client.on('message', msg => {
  sort(msg)
})

client.login('Njk0Njg5NTIxODc0MjM5NTY4.XoPccg.7_gDEcIyA2R2pM0FU4YtfO7FiWU')