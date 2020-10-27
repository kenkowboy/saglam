const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  //if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('<a:donence:705725891145236490>**Bu Komutu Kullanmak İçin **Kullanıcı Yasakla** Yetkisine Sahip Olmalısın.').setColor(10038562));
  if (!message.member.roles.find('name', 'Ban Komut')) return message.channel.send("**Ban Komut** Yetkin yok!");
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`unban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  let banbilgi = guild.channels.find('name', 'ceza-bilgi');
  if (!banbilgi) return message.reply('`ceza-bilgi` kanalını bulamıyorum.');
  if (!user) return message.reply('<a:donence:705725891145236490> Banı kaldırılacak kişinin ID numarasını yazmalısın.').catch(console.error);
  if (reason.length < 1) return message.reply('<a:donence:705725891145236490> Ban kaldırma sebebini yazmalısın.');
  message.guild.unban(user);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('<a:tik1:705726267886010378>Eylem:', 'Ban kaldırma')
    .addField('<a:tik1:705726267886010378>Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('<a:tik1:705726267886010378>Sebep', reason);
  client.channels.get("705732421856919653").send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};