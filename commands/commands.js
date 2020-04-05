const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
module.exports = function commands(msg) {
    const command = msg.content.slice(prefix.length).split(' ').shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    else if(command === 'commands' || command === 'comandos' || command === 'help' || command === 'ajuda') {
        msg.channel.send(new MessageEmbed()
                        .setTitle('🤖 Comandos do m3sklvbot 🤖')
                        .setDescription(`
                        **!ajuda, !help, !comandos ou !commands** - Mostra todos os comandos do nosso bot;
                        **!sorteio** - Realiza sorteio para X5;
                        **!clima, !tempo ou !weather** - Mostra a previsão do tempo de hoje para São Paulo;
                        **!search ou !pesquisa** - Realiza e mostra os resultados de uma pesquisa.
                        `)
                        .setFooter('Criado com ❤ por M3SKLV T3CH')
                        .setColor('#fff200'))
    }
}