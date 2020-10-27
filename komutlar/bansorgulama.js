const Discord = require('discord.js');

exports.run = (client, message, args) => {
if(!message.member.roles.has("705737521098784778")) return message.channel.send("**Üzgünüm bu komutu kullanmak için `\Ban Komut\` yetkisine sahip olmalısınız**").then(msg => msg.delete(5000));
    let kullanici = args[0];
    if (!kullanici) return message.channel.send(":no: Banlanan Bir kullanıcının ID'sini belirtmen gerek")
    message.guild.fetchBans()
        .then(bans => {
            if (!bans.has(kullanici)) {
                return message.channel.send(`:no: Bu kullanıcı banlanmamış.`)
            }
        })
    message.guild.fetchBan(kullanici).then(({ user, reason }) => {
        var sebep;
        if (reason === null) sebep = "Neden belirtilmemiş"
message.channel.send(` ${user.tag} adlı kullanıcının ban nedeni: \n\n**${reason}**`)
        })
                                           }
                                           

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bansorgulama','bansorgu','ban-sorgulama','BANSORGULAMA','ban-sorgu'],
    permLevel: 0
};

exports.help = {
    name: 'bansorgulama',
    description: 'Ban sorgulama yaparsınız',
    usage: 'bansorgulama'
};