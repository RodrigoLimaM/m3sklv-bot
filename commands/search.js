const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const searchAPI = require('../api')

module.exports = function search(msg) {
    const arg = msg.content.replace('!search', '').replace('!pesquisa', '');
    const command = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    else if(command === 'search' || command === 'pesquisa') {
        searchAPI().getSearch(arg).then((nextEvent) => {
            msg.channel.send(new MessageEmbed()
                        .setTitle('🤖 Pesquisa 🤖')
                        .addField(nextEvent.description || 'google.com', nextEvent.body || 'Não encontrado :(')
                        .setImage(nextEvent.image)
                        .setFooter('Criado com ❤ por M3SKLV T3CH')
                        .setColor('#fff200'))
        })
    }
}