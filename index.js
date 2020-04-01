require('dotenv').config()

const { Client } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const client = new Client()
const sort = require('./commands/sort')
const greetings = require('./commands/greetings')

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}`)
})

client.on('message', msg => {
  sort(msg)
})

client.on('message', msg => {
  greetings(msg)
})

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'geral');
  if (!channel) return;
  channel.send(
    embed = new MessageEmbed()
      .setTitle('CORNO ENTROU')
      .setDescription('Salve CARAIO')
      .setFooter('Criado com ❤ por M3SKLV T3CH')
      .setColor('#fff200')
  );
});

client.login(process.env.TOKEN_DISCORD)