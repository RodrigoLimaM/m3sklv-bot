module.exports = function greetings(msg) {
    if (msg.content.toUpperCase().includes('BOM DIA') && !msg.author.bot)
        msg.channel.send('Bom dia! :slight_smile:')

    if (msg.content.toUpperCase().includes('BOA TARDE') && !msg.author.bot)
        msg.channel.send('Boa tarde! :slight_smile:')

    if (msg.content.toUpperCase().includes('BOA NOITE') && !msg.author.bot)
        msg.channel.send('Boa noite! :slight_smile:')
}