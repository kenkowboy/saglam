const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();

exports.run = async (receivedMessage, msg, args) => {
     //if (!msg.member.hasPermissions("KICK_MEMBERS")) return msg.channel.send('Bu Komutu Kullanmak İçin Yetkin Yeterli Değil !')
       if (!msg.member.roles.has("706173888782008322")) return msg.channel.send('<a:donence:705725891145236490> Yeterli yetki bulunmamakta.')  
var mod = msg.author
    let reason = args.join(" ").slice(25);
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if (!user) return msg.reply('Bir kullanıcı etiketlemelisin.')
  if (!reason) return msg.reply('Bir sebep belirtmelisin.')
  let mute = msg.guild.roles.find(r => r.name === "Muteli");
          
  let mutetime = args[1];
if(!mute){
      mute = await msg.guild.createRole({
        name: "Cezalı",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false,
          CONNECT: false,
          READ_MESSAGE_HISTORY: false,
          VIEW_CHANNEL: false,
        });
      });
  
    }
  
  
  await(user.addRole(mute.id));
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  

  const muteembed = new Discord.RichEmbed()
         .setTitle('Quantum | Süreli Susturma:')
      .addField(`Yetkili` , ` <a:tac:705968103695188028>${mod} Adlı Yetkili Susturma Yetkisi Kullandı.**<@${user.id}>** adlı kullanıcı ${reason} sebebi ile ${mutezaman} susturuldu.`)
    msg.channel.send(muteembed);
  setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
      const muteembed = new Discord.RichEmbed()
      .setDescription(`<@${user.id}> Mute Süren Doldu, Artık Konuşabilirsin!`)
        msg.channel.send(muteembed)
    user.removeRole(mute.id);
  }, ms(mutetime));
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute",'smute'],
  permLevel: 0,
  kategori:'yetkili',
};

exports.help = {
  name: "mute",
  description: "Belirttiğiniz kullanıcıyı belirttiğiniz zamana göre susturur.",
  usage: ""
}