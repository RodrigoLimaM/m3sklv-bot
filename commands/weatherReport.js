const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const weatherAPI = require('../api')

module.exports = function weather(msg) {
    const command = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    else if(command === 'tempo' || command === 'weather' || command === 'clima') {
        weatherAPI().getWeather().then((nextEvent) => {
            msg.channel.send(new MessageEmbed()
                        .setTitle('🤖 Temperatura 🤖')
                        .addField('São Paulo', nextEvent)
                        .setFooter('Criado com ❤ por M3SKLV T3CH')
                        .setColor('#fff200'))
        })
    }
}