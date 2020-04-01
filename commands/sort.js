const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
module.exports = function sort(msg) {
  let players = []
  let teams = []
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  else if (command === 'sorteio') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    }
    for (i = 0; i < args.length; i++) {
      players.push(args[i])
    }
  }

  while (players.length != 0) {
    let randomNumber = Math.floor(Math.random() * players.length);
    let choosed = players[randomNumber]
    teams.push(choosed)
    players = players.filter(name => name != choosed);
  }


  let team1 = ""
  let team2 = ""
  for (let i = 0; i < 5; i++) {
    team1 += teams[i] + "\n"
    team2 += teams[i + 5] + "\n"
  }

  let embedA = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('🏴 Sorteio de Times 🏴')
    .addFields(
      { name: 'TIME 🅰', value: team1, inline: true },
      { name: 'TIME 🅱', value: team2, inline: true },
    )
    .setFooter('Criado com ❤ por M3SKLV T3CH');

  msg.channel.send(embedA)
}

