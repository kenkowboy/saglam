const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const yetkili ='705772569860505657'
  const kayıtsız ='705773248024936448'
  const erkek ='706763991845830677'
  if (!message.member.roles.has(`${yetkili}`))
 return message.channel.send(`<a:donence:705725891145236490>Bu komutu kullanabilmek için '<@&${yetkili}>' rolune sahip olmasınız.`);
  let tag = "ঠ"
  let tag2 = "•"
  let ism = args.slice(1).join(" ").replace(args[args.length-1], "")
  let yas = args.slice(args.length-1).join(" ")
  let ayarlanacak = tag +" "+ ism + tag2 +" "+ yas
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("Kullanıcıyı Etiketle !");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  member.addRole(`${erkek}`);
  member.removeRole(`${kayıtsız}`);
  member.setNickname(`${ayarlanacak} `)
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`<a:tik1:705726267886010378> Kayıt İşlemi`)  
  .addField(`<a:donence:705725891145236490>**Verilen Rol**:`,` <a:tik1:705726267886010378><@&${erkek}>`)
  .addField(`<a:donence:705725891145236490>**Alınan Rol**:`,` <a:tik1:705726267886010378><@&${kayıtsız}>`)
  .addField(`<a:donence:705725891145236490>**Değişen İsim**:`,`<a:tik1:705726267886010378>**${ayarlanacak}**`)
  //.setImage(`https://graphicdesignblg.com/post/130971219813/octopus-gif-by-tony-pinkevich-follow-us-on`)
  .setImage(`https://cdn.discordapp.com/attachments/705808207909486652/705882666360111204/LT1Pq74cXuNQxyUmLk.gif`)
  .setFooter(`Komutu Kullanan Yetkili : ${message.author.username}`)
  return message.channel.send(embed);
  message.react('🔧')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e,erkek"],
  permLevel: 0
};

exports.help = {
  name: "e", 
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "b!e isim yaş"
};