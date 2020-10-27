const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {   
if(!message.member.roles.has("705737521098784778")) return message.channel.send(`<a:donence:705725891145236490> Yeterli yetki bulunmamakta.`)
let kişi = message.mentions.users.first(1); 
    
    const mod = message.author;
let member = args[0];
if (isNaN(member)) return message.reply('Doğru ID girmelisiniz.');
let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let modlog = guild.channels.find(x => x.name === "ceza-bilgi");
  if (!modlog) return message.reply('`ceza-bilgi` kanalını bulamıyorum.');
	const sebep = args.splice(1, args.length).join(' ') || `Sebep belirtilmemiş.`;
	
message.guild.ban(member, sebep+" | Yetkili: "+message.author.tag).then(() => {
//client.channels.get("687793097048064054").send(`**<:tik1:704487970404827258> ${message.author.username}#${message.author.discriminator} Birisini id ile banlandı. \n      <a:donence:704405017951731852> Kullanıcı id =  **\`${member}\` \n <a:donence:704405017951731852> **Sebep:** \`${sebep}\``)
const embed = new Discord.RichEmbed()  
.setThumbnail(client.user.avatarURL)    
.setAuthor(message.guild.name, message.guild.iconURL)
.setColor("#005b94")
.addField('<a:tik1:705726267886010378>Ceza', `idban`)
.addField('<a:tik1:705726267886010378>Yetkili', `${mod}`)
.addField('<a:tik1:705726267886010378>Sebep', `${sebep}`)
.addField('<a:tik1:705726267886010378>Kullanıcı idsi', `${member}`)
.setImage('https://cdn.discordapp.com/attachments/705905147729150043/706031732025196554/happy-cat-gif-unscreen-1-896.gif')
.setFooter(`Quantum ID Ban Komutu Kullanıldı.`)
message.react('🔧')
client.channels.get("705732421856919653").send(embed) 
	
});
}

exports.conf = {
	enabled: true,
	guildOnly: true,	guildOnly: true,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'idban',
	category: '',
	description: '',
	usage: 'forceban '
};