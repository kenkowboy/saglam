const Discord = require('discord.js')

exports.run = async(client, message, args) => {

      let isEnabled;
      message.reply("Başvuru Komutunu Kullandığınız İçin Teşekkürler. Başvurunuz Yetkili Ekibimize İletilmiştir. Başvurunuz İçin Size Geri Dönüş Yapacağız Teşekkürler ❤️");
      let mesaj = args.slice(0).join(' ');
      let chan = message.channel;
      let destekKanal = "706992124293283951";
      const embed = new Discord.RichEmbed()
        .addField('🔔Duyuru🔔', `Yeni Bir Yetkili Başvurusu`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
        .setColor("RANDOM")
        .addField(`Bilgiler`, `**Sunucu**: ${message.guild.name} (${message.guild.id}) \n**Kanal**: ${message.channel.name} (${message.channel.id}) \n**Başvuruda Bulunan**: ${message.author.tag} (${message.author.id}) \n**Başvuru Mesajı**: ${mesaj}`)
        .setFooter("Quantum Başvuru")
        .setTimestamp()
      client.channels.get(destekKanal).send({
        embed: embed
      });
      }
    

  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "bot",
  permLevel: 0
};

exports.help = {
  name: 'başvuru',
  description: 'Kullanım: q!başvuru -başvurunuzu-yazın- Yetkili Olmak Hakkında Başvuru Oluşturur.',
  usage: 'q!başvuru'
};