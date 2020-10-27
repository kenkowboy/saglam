const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const yetkili ='705772569860505657'
  const kayıtsız ='705773248024936448'
  const kız ='706764275368198196'
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
  member.addRole(`${kız}`);
  member.removeRole(`${kayıtsız}`);
  member.setNickname(`${ayarlanacak} `)
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`<a:tik1:705726267886010378> Kayıt İşlemi`)  
  .addField(`<a:donence:705725891145236490>**Verilen Rol**:`,` <a:tik1:705726267886010378><@&${kız}>`)
  .addField(`<a:donence:705725891145236490>**Alınan Rol**:`,` <a:tik1:705726267886010378><@&${kayıtsız}>`)
  .addField(`<a:donence:705725891145236490>**Değişen İsim**:`,`<a:tik1:705726267886010378>**${ayarlanacak}**`)
  .setImage(`https://cdn.discordapp.com/attachments/705808207909486652/705882666360111204/LT1Pq74cXuNQxyUmLk.gif`)
  .setFooter(`Komutu Kullanan Yetkili : ${message.author.username}`)
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k,kız,bayan,kadın"],
  permLevel: 0
};

exports.help = {
  name: "k", 
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "b!e isim yaş"
};