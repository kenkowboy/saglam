const Discord = require('discord.js');
exports.run = function (client, message, args) {
  if(!message.member.roles.has("706778865069981697")) return message.channel.send(`<a:donence:705725891145236490> Yeterli yetki bulunmamakta.`)
  if (!args[0]) return message.channel.send("Silinecek mesajın miktarını yaz!");
  message.delete()
  message.react('688880850200428550')
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`<a:kalpbeyaz:705725991292502036> **${args[0]} Adet Mesaj Başarıyla Silindi!**`)
  .then(m =>m.delete(10000))
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear'],
  permLevel: 1
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};