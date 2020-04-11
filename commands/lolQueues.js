const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const searchAPI = require('../api')

module.exports = function lolQueues(msg) {
    const arg = msg.content.replace('!elo ', '')
    const command = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    else if(command === 'elo') {
        searchAPI().getLolQueues(arg).then((nextEvent) => {
            msg.channel.send(new MessageEmbed()
                        .setTitle('🤖 Maestria 🤖')
                        .addField(arg , nextEvent || 'Não rankeado :(')
                        .setFooter('Criado com ❤ por M3SKLV T3CH')
                        .setColor('#fff200'))
        })
    }
}