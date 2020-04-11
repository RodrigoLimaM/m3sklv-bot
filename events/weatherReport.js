const { MessageEmbed } = require('discord.js')
const weatherAPI = require('../api')

module.exports = function weather(msg) {
    weatherAPI().getWeather().then((nextEvent) => {
        msg.channel.send(new MessageEmbed()
                    .setTitle('🤖 Temperatura 🤖')
                    .addField('São Paulo', nextEvent)
                    .setFooter('Criado com ❤ por M3SKLV T3CH')
                    .setColor('#fff200'))
    }) 
}