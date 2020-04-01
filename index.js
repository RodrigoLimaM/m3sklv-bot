require('dotenv').config()

const { Client } = require('discord.js')
const client = new Client()
const sort = require('./commands/sort')

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}`)
})


client.on('message', msg => {
  sort(msg)
})

client.login(process.env.TOKEN_DISCORD)