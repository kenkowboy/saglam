const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let voxy = args.slice(0).join(' ');
if (voxy.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(voxy);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz', 'botyaz', 'bot-yaz', 'bota-yazdır'],
  permLevel: 3
};

exports.help = {
  name: 'yaz',
  description: '{Yönetici komutu}',
  usage: 'yaz {Yazdıracağınız mesaj}'
};