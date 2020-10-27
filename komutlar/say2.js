const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let tag = "ঠ" // tagınız
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("<a:kalp2:705918827799773304>Sunucudaki Üye Sayısı", message.guild.memberCount)
        .addField("<a:kalp2:705918827799773304>Çevrimiçi Üye Sayısı", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:kalp2:705918827799773304>Seslideki Üye Sayısı", count)
        .addField("<a:kalp2:705918827799773304>Tagdaki Üye Sayısı", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tag kullanmıyor iseniz burayı silin
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
    message.channel.send(embed)
   .then(m =>m.delete(30000))
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
};