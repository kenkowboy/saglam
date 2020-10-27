const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısın.').setColor(10038562));
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!rMember) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Lütfen bir kullanıcı ismi gir.\nÖrnek: ` + ayarlar.prefix + `rolver **@İsim @Yetki**`).setColor(10038562).setAuthor(`${message.author.username} tarafından istendi.`, message.author.avatarURL).setTimestamp());
    let role = message.mentions.roles.first()

    if (!role) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Lütfen bir rol ismi gir.\nÖrnek: ` + ayarlar.prefix + `rolver **@İsim @Yetki**`).setColor(10038562).setAuthor(`${message.author.username} tarafından istendi.`, message.author.avatarURL).setTimestamp());
    let aRole = message.mentions.roles.first()
    if (!aRole) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Bu rolü bulamıyorum.\nÖrnek: ` + ayarlar.prefix + `rolver **@İsim @Yetki**`).setColor(10038562).setAuthor(`${message.author.username} tarafından istendi.`, message.author.avatarURL).setTimestamp());
    if (rMember.roles.has(aRole.id)) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('**Kullanıcı Zaten Bu Role Sahip **!').setColor(10038562).setTitle('🥀 Komut Kullanımı Başarısız 🥀').setFooter('🐥 Quantum Rol Dağıtma 🐥'));
    await (rMember.addRole(aRole.id))
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`${rMember} **İsimli Kullanıcı'ya** [\`${role.name}\`] **İsimli Rol Başarıyla Verildi ** :white_check_mark:`).setColor('RANDOM').setTitle('💛 Komut Kullanımı Başarılı 💛').setFooter('🐥 Quantum Rol Dağıtma 🐥'));

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolver','rv', 'ver'],
  permLevel: "0"
};

exports.help = {
  name: "rolver",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};