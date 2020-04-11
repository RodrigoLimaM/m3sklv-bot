const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const searchAPI = require('../api')

module.exports = function lolMastery(msg) {
    const arg = msg.content.replace('!mastery ', '').replace('!maestria ', '');
    const command = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    else if(command === 'mastery' || command === 'maestria') {
        searchAPI().getLolMastery(arg).then((nextEvent) => {
            msg.channel.send(new MessageEmbed()
                        .setTitle('🤖 Maestria 🤖')
                        .addField(arg , nextEvent)
                        .setFooter('Criado com ❤ por M3SKLV T3CH')
                        .setColor('#fff200'))
        })
    }
}