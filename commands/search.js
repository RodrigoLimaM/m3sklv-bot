const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const searchAPI = require('../api')

module.exports = function search(msg) {
    const arg = msg.content.replace('!search', '').replace('!pesquisa', '');
    const command = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    else if(command === 'search' || command === 'pesquisa' || command === 'pesquisar') {
        searchAPI().getSearch(arg).then((nextEvent) => {
            if(typeof nextEvent.link === 'string') {
                msg.channel.send(new MessageEmbed()
                            .setTitle('🤖 Pesquisa 🤖')
                            .addField(nextEvent.link || 'pt.wikipedia.org', nextEvent.body || 'Não encontrado :(')
                            .setImage(nextEvent.image)
                            .setFooter('Criado com ❤ por M3SKLV T3CH')
                            .setColor('#fff200'))
            } else {
                msg.channel.send(new MessageEmbed()
                            .setTitle('🤖 Pesquisa 🤖')
                            .addField('pt.wikipedia.org', 'Não encontrado :(')
                            .setFooter('Criado com ❤ por M3SKLV T3CH')
                            .setColor('#fff200'))
            }
        })
    }
}