const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args, prefix, ayar, emoji) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Yönetici iznine sahip olmalısın!');
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!db.get(`otorol.${message.guild.id}`)) return message.reply('Sunucunun otorolü zaten ayarlanmamış!');
    db.delete(`otorol.${message.guild.id}`);
    message.reply('Sunucunun otorolü başarıyla sıfırlandı!');
    return;
  };
  
  // !otorol @üye @bot #kanal
  // !otorol sıfırla  
  let uyeRolu = message.mentions.roles.first() || message.guild.roles.get(args[0]);
  let botRolu = message.mentions.roles.array()[1] || message.guild.roles.get(args[1]);
  let kanal = message.mentions.channels.first();
  
  if (!uyeRolu || !botRolu || !kanal) return message.reply(`Komutu doğru kullanmalısın!\n${prefix+this.help.usage}`);
  db.set(`otorol.${message.guild.id}`, { uyeRolu: uyeRolu.id, botRolu: botRolu.id, kanal: kanal.id });
  message.reply(`Üye rolü başarıyla ${uyeRolu.name}, bot rolü başarıyla ${botRolu.name} olarak, kanal ise ${kanal}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'otorol', 
  description: 'Otorol.',
  usage: 'otorol @üyeRolü @botRolü #kanal / sıfırla',
  kategori: 'kullanıcı'
};