const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (!message.guild) {
    if (!message.member.roles.find('name', 'Kick Komut')) return message.channel.send("**Kick Komut** Yetkin yok!");
  const ozelmesajuyari = new Discord.RichEmbed()
  //.setColor(0xFF0000)
  //.setTimestamp()
  //.setAuthor(message.author.username, message.author.avatarURL)
  //.addField(':warning: Uyarı :warning:', '`kick` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'ceza-bilgi');
  if (!modlog) return message.reply('`ceza-bilgi` kanalı oluşturman lazım.');
  if (message.mentions.users.size < 1) return message.reply('❗Kimi Kickleyeceğimi Yazmadın.❗').catch(console.error);
  if (reason.length < 1) return message.reply('Bir Sebep Belirtmelisin.');
  if (!message.guild.member(user).kickable) return message.reply(' Yetkilileri sunucudan atamam.❗');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setFooter('Büşbüş Adam Tekmeleme A.Ş')
    .addField('<a:ates1:705739526185943121> Eylem:', 'Sunucudan Atma')
    .addField('<a:ates1:705739526185943121> Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('<a:ates1:705739526185943121> Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField("<a:ates1:705739526185943121> Kicklendiği Kanal:", message.channel)
    .addField("<a:ates1:705739526185943121> Kicklendiği Zaman:", message.createdAt)
    .addField('<a:ates1:705739526185943121> Sebep:', reason);
  client.channels.get("705732421856919653").send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};