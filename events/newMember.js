const { MessageEmbed } = require('discord.js')
module.exports = function newMemberMessage(member) {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'geral')
    
    if (!channel) return
    
    channel.send(new MessageEmbed()
                    .setTitle('CORNX ENTROU')
                    .setDescription(`SALVE ${member.user} CARAIO`)
                    .setFooter('Criado com ❤ por M3SKLV T3CH')
                    .setColor('#fff200'))
}