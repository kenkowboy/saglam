const Discord = require('discord.js');


exports.run = function(client, message, retrymessage) {

    message.channel.send("**Bot Yeniden Başlatılıyor**").then(msg => {
        console.log("[BOT]Yeniden başlatılıyor")
        process.exit(0);
    }); 
};


exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'yenile', 
  description: 'Botu yeniden başlatır',
  usage: 'yenile'
};