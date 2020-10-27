const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const vip ='706765145191350302'
  const yetkili ='706778865069981697'
  if (!message.member.roles.has(`${yetkili}`))
 return message.channel.send(`<a:donence:705725891145236490>Bu komutu kullanabilmek için '<@&${yetkili}>' rolune sahip olmasınız.`);
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("Kullanıcıyı Etiketle !");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  member.addRole(`${vip}`);
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`<a:tik1:705726267886010378> Vip İşlemi`)  
  .addField(`<a:donence:705725891145236490>**Verilen Rol**:`,` <a:tik1:705726267886010378><@&${vip}>`)
  .setImage(`https://cdn.discordapp.com/attachments/706119338616291379/706814294834282496/vip-87313.gif`)
  .setFooter(`Komutu Kullanan Yetkili : ${message.author.username}`)
  return message.channel.send(embed)//.then(m =>m.delete(20000))
  message.react('🔧')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["v,vip"],
  permLevel: 0
};

exports.help = {
  name: "vip", 
  description: "Bir Vip'ye Ne Dersin ?",
  usage: "q!vip Kullanıcı"
};