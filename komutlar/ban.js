const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.member.roles.find('name', 'Ban Komut')) return message.channel.send("**Ban Komut** Yetkin yok!");
  //if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komutu kullanmak için **Kullanıcı Yasakla** yetkisine sahip olmalısın.').setColor(10038562));
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Birini Etiketlemedin Keserim Seni !');
  if (message.mentions.users.size < 1) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('Yetkilileri banlayamam.');
  message.guild.ban(user, 2);
  message.react("🔧")
  .catch(console.error);
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`<a:tik1:705726267886010378>Komut Kullanımı`, `<a:tik1:705726267886010378>**Yasaklanan Kullanıcı :**  ${user.username}#${user.discriminator} \n<a:tik1:705726267886010378>**Yasaklayan Yetkili  :**  ${message.author.username}#${message.author.discriminator}   \n<a:tik1:705726267886010378>**Yasaklama Sebebi :**  ${reason} `)
  .setImage(`https://i.makeagif.com/media/11-30-2015/ew5F86.gif`)
  .setFooter(`😈 Quantum Ban Komut 😈`)
  return message.channel.send(embed)
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};