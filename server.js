const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const express = require("express");
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment');
require("moment-duration-format");
require('./util/eventLoader')(client);
const app = express();
const http = require('http');
var prefix = ayarlar.prefix;
//////////////////////////////////////*

function foo() {
  return new Promise((resolve, reject) => {
  return resolve();
});
}
async function foobar() {
foobar();
foo().then(() => {}).catch(() => {});
foobar().catch(console.error);
}

app.get("/foo", (req, res, next) => {
  const foo = JSON.parse(req.body.jsonString);
});
process.on("unhandledRejection", (reason, promise) => {

});

/////////////////////////////////////

 app.get("/", (request, response) => {
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://hebellul.glitch.me/`);
    }, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`> Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  

if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.zpeed) permlvl = 4;

  return permlvl;
};
///////////////////////////////BOT BİTİŞ


////REKLAM KÜFÜR ENGEL
client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`);
  let kullanici = message.member;
  if (reklamkick == "kapali") return;
  if (reklamkick == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "amk",
      "oc",
      "oç",
      "aq",
      "bok",
      "siktir"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Quantum Reklam Engelleme A.Ş", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> **Reklam & Küfür Kick Sistemine Yakalandın! Reklam Veya Küfür Yazmaya Devam Edersen Kickleniceksin ! `(1/3)`**`
            )
            .setImage(`https://media.giphy.com/media/ZT7NnaezicELu/giphy.gif`)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Quantum Reklam Engelleme A.Ş", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> **Reklam & Küfür Kick Sistemine Yakalandın! Reklam Veya Küfür Yazmaya Devam Edersen Kickleniceksin ! `(2/3)`**`
            )
            .setImage(`https://media.giphy.com/media/ZT7NnaezicELu/giphy.gif`)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam Kick Sistemi Seni Uyarmıştı.`
          });
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
          reason: `Reklam ban sistemi`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Quantum Reklam Engelleme A.Ş", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> **Uyarılıp Kick Yemesine Rağmen Devam Ettiği İçin Banlandı.**`
            )
            .setImage(`https://media.giphy.com/media/dvOwFmfbzmAsI9v2IV/giphy.gif`)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});
////REKLAM ENGEL

///AFK KOMUTU 
client.on("message", async message => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(` afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(` afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (db.has(`afk_${kullanıcı.id}`)) {
    let süre = await db.fetch(`afkzaman_${kullanıcı.id}`);
    console.log(süre);
    let timeObj = ms(new Date().getTime() - süre);
    let zaman = moment
      .duration(new Date().getTime() - süre)
      .format("H [saat] m [dakika] s [saniye]");
    message.delete();
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`${client.user.username} Bot - Afk Sistemi`)
        .setDescription(
          `
      **${
        client.users.get(kullanıcı.id).username
      }** adlı kullanıcı şuanda AFK! \n**AFK süresi :** \`${zaman}\`\n**Etiketleyen Kişi :** <@${
            message.author.id
          }> 
      `
        )
        .setTimestamp()
        .setColor("2f3136")
        .setThumbnail(message.author.avatarURL)
    );
  }

  if (db.has(`afk_${message.author.id}`)) {
    message.channel
      .send(
        new Discord.RichEmbed()
          .setDescription(
            `**<@${message.author.id}> >> Başarıyla AFK modundan çıktın! Tekrar Hoşgeldin :)**`
          )
          .setColor("2f3136")
      )
      .then(msg => msg.delete(5000));
    db.delete(`afk_${message.author.id}`);
    db.delete(`afkzaman_${message.author.id}`);

    kullanıcı = message.guild.member(kullanıcı);
    kullanıcı.setNickname(kullanıcı.displayName.replace("[AFK]", ""));
  }
});
///AFK KOMUTU

////DM GÖRME
client.on("message", msg => {
var dm = client.channels.get("706010114527854664")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.RichEmbed()
.setTitle(`<a:tac:705968103695188028> ${client.user.username} DM Kutusu <a:tac:705968103695188028>`)
.setTimestamp()
.setColor("BLUE")
.setThumbnail(`${msg.author.avatarURL}`)
.addField("Mesaj Atan", msg.author.tag)
.addField("Mesaj Atanın İDsi", msg.author.id)
.addField("Gönderilen Mesaj", msg.content )

dm.send(botdm)

}
if(msg.channel.bot) return;
});
////DM GÖRME

////HOŞGELDİN MESAJI
client.on("guildMemberAdd", async (member, message, args) => {
  try {
    let aresMessage = new Discord.RichEmbed();
    await member.addRole("705773248024936448");
    await member.setNickname(`${member.user.username}`);
    await client.channels
      .get("705727698919489558")
      .send(
        `<a:ayar:705842551025827872> **Sunucumuza hoşgeldin ${member}
<a:ayar:705842551025827872> Seninle \`${member.guild.memberCount}\` Kişiyiz!**\

<a:ayar:705842551025827872> **Kurallarımızı Okumayı Unutma Lütfen !**
<a:ayar:705842551025827872> **Kaydının Yapılması için,**
<a:ayar:705842551025827872> **<@&705772569860505657> Rolündeki Yetkilileri Etiketleyip Sesli Teyit Odamıza Gelmen Yeterli Olucaktır.**
<a:ayar:705842551025827872> **Unutmadan Kaydın Yapıldıktan Sonra "Selection" Kanallarımızdan Rollerini Almayı Unutma. <a:kalp:705741263181447249>**
<a:ayar:705842551025827872> **Tagımızı Alarak Bize Destek Olmayı Unutma. <a:kalp:705741263181447249>**`,   
        
        new Discord.Attachment(
          "https://cdn.discordapp.com/attachments/706119338616291379/706879329933590568/OkJat1YNdoD3W.gif"
        )
      );
    if (!member.roles.has(" ")) {
      member.addRole(" ");
    }
  } catch (err) {
    console.log(err);
  }
});
////HOŞGELDİN MESAJI




////SES KANALI
client.on('ready', ()=>{
client.channels.get('705588011735318583').join()
})
////SES KANALI


////SA-AS
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleyküm selam,  Hoş geldin ^^');
  }
});
////SA AS

////SA AS 2
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply('Aleyküm selam,  Hoş geldin ^^');
  }
});
////SA AS 2

////SA AS 3
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('Aleyküm selam,  Hoş geldin ^^');
  }
})
////SA AS 3

////SA AS 4
client.on('message',msg => {
  if (msg.content.toLowerCase() == 'tag') {
   return msg.channel.send('**ঠ**');
  }
});
////SA AS 4

////TAG ALANA ROL
client.on("userUpdate", async(old, rm) => {

  let tag = "ঠ";
  let rolid = "706764604575055923";
  let kanal = "705808207909486652";
  let sunucuid = "705588011735318578";
  
  if(old.username !== rm.username) {
  if(!rm.username.includes(tag) && client.guilds.get(sunucuid).members.get(rm.id).roles.has(rolid)) {
     client.guilds.get(sunucuid).members.get(rm.id).removeRole(rolid)
     client.channels.get(kanal).send(`**${rm}, <a:krkkalp:705919551069618196>Tagını Çıkardığı İçin <@&${rolid}> Rolünü Kaybetti!\n [Üzdün Bizi be 🚬] <a:krkkalp:705919551069618196>**`)
    } 
    
     if(rm.username.includes(tag) && !client.guilds.get(sunucuid).members.get(rm.id).roles.has(rolid)) {
      client.channels.get(kanal).send(`**${rm} <a:skalp:705906725433376799>Tagını Aldığı İçin <@&${rolid}> Rolü Kazandı!\n [Bir'de Çilekli Çüt Kazandın eheheh] <a:skalp:705906725433376799>**`) 
      client.guilds.get(sunucuid).members.get(rm.id).addRole(rolid)
     }
  }
  })
////TAG ALANA ROL


////BOT KORUMA
client.on("guildMemberAdd", member => {
  let guvenlik = db.fetch(`bottemizle_${member.guild.id}`);
  if (!guvenlik) return;
  if (member.user.bot !== true) {
  } else {
    member.ban(member);
  }
});
////BOT KORUMA

////MESAJ LOG
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let voxy = message.guild.channels.find(c => c.name === "mesaj-log");
  let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Mesaj Gönderildi`, message.author.avatarURL)
    .addField("Kullanıcı", message.author)
    .addField("Mesaj", message.content, true)
    .addField("Kanal Adı", message.channel.name, true)
    .addField("Mesaj ID", message.id, true)
    .addField("Kullanıcı ID", message.author.id, true)
    .setThumbnail(message.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${message.createdAt.getHours() +
        3}:${message.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  voxy.send(embed)
  
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  let voxy = newMessage.guild.channels.find(
    c => c.name === "mesaj-log"
  );
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", oldMessage.content, true)
    .addField("Yeni Mesaj", newMessage.content, true)
    .addField("Kanal Adı", newMessage.channel.name, true)
    .addField("Mesaj ID", newMessage.id, true)
    .addField("Kullanıcı ID", newMessage.author.id, true)
    .setThumbnail(newMessage.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  voxy.send(embed);
});
client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let voxy = deletedMessage.guild.channels.find(
    c => c.name === "mesaj-log"
  );
  let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", deletedMessage.content, true)
    .addField("Kanal Adı", deletedMessage.channel.name, true)
    .addField("Mesaj ID", deletedMessage.id, true)
    .addField("Kullanıcı ID", deletedMessage.author.id, true)
    .setThumbnail(deletedMessage.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours() +
        3}:${deletedMessage.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  voxy.send(embed);
});
////MESAJ LOG



////AFK
client.on("message", message => {

//var i = db.fetch(`prefix_${message.guild.id}`)

  
    let afk_kullanici = message.mentions.users.first() || message.author;
    if(message.content.startsWith(ayarlar.prefix+"afk")) return; 
 if (message.author.bot === true) return;
   

     if(message.content.includes(`<@${afk_kullanici.id}>`))
         if(db.has(`afks_${afk_kullanici.id}`)) {
             const afksuan = new Discord.RichEmbed()
                     .setColor("RANDOM")
                     .setDescription(`**<a:puf:706119951827861555>${client.users.get(afk_kullanici.id).tag}** Kullanıcı Şuanda AFK!\n<a:puf:706119951827861555>**AFK Sebebi:** **${db.fetch(`afks_${afk_kullanici.id}`)}**\n<a:puf:706119951827861555>**Etiketleyen:** ${message.author}` )
                     message.channel.send(afksuan)
         }
   
         if(db.has(`afks_${message.author.id}`)) {
                        let user = message.member

             const basarili = new Discord.RichEmbed()

                 .setColor("GREEN")
                 .setDescription("<@"+`${message.author.id}`+">"+"**Başarıyla AFK Modundan çıktın <a:galp:706124519214940261>**")
                              user.setNickname(message.author.username)

                message.channel.send(basarili)
             db.delete(`afks_${message.author.id}`)
         } 

       });
   
////AFK


////OTOROL
client.on("guildMemberAdd", async member => {
  let veri = db.get(`otorol.${member.guild.id}`);
  if (!veri) return;
  if(!member.guild.roles.has(veri.uyeRolu) || !member.guild.roles.has(veri.botRolu) || !member.guild.channels.has(veri.kanal)) return db.delete(`otorol.${member.guild.id}`);
  
  if (member.user.bot) {
    member.addRole(veri.botRolu);
    member.guild.channels.get(veri.kanal).send(`${member} Adlı Bot Sunucuya Katıldı! Bot rolü verildi!`);
  } else {
    member.addRole(veri.uyeRolu);
    member.guild.channels.get(veri.kanal).send(`${member} Adlı Kullanıcı Sunucuya Katıldı! <@&705773248024936448> Rolü Verildi!`);
  };
});
////OTOROL




///BUNUN AŞAĞISINA DOKANMA (KOMUTLARI ÜSTÜNE KOY)
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
