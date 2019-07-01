const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);
const storedb = low(storeadapter);
const superagent = require("superagent")
const cuteapi = require("cuteapi")
const os = require('os');
const serverStats = {
  guildID: '523806907933130752',
  totalUsersID: '569522567837253632',
  memberCountID: '569522583561568256',
  botCountID: '569522602054254602'
};
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")


const booru = require('booru');

db.defaults({ histoires: [], xp: []}).write()
var bot = new Discord.Client();
var prefix = ("R3L!");
var token = process.env.TOKEN
var cpu = os.loadavg();
var randnum = 0
var botenabled = true;
var storynumber = db.get('histoires').map('story_value').value();
var dispatcher;
bot.on('ready', () => {
  bot.user.setActivity("dev par le serv R3L shop [R3L!help]", {type: "WATCHING"});
    console.log('Bot Ready !');
});

bot.login("ah")


bot.on("guildMemberAdd", member => {
  if (member.guild.id !== serverStats.guildID) return; 
  bot.channels.get(serverStats.totalUsersID).setName(`Nombre d'utilisateur(s): ${member.guild.memberCount}`)
  bot.channels.get(serverStats.memberCountID).setName(`Nombre de membre(s): ${member.guild.members.filter(m => !m.user.bot).size}`)
  bot.channels.get(serverStats.botCountID).setName(`Nombre de bot(s): ${member.guild.members.filter(m => m.user.bot).size}`)
  member.guild.channels.find("id", "523806907933130754").send(`:white_check_mark: ${member.user.username} Est arrivé(e) ! Nice ! :p`)
  
})
bot.on('guildMemberAdd', member => {
    var roles = member.guild.roles.find('name', 'sans fiche');
    member.addRole(roles)
})

bot.on("guildMemberRemove", member => {
  if (member.guild.id !== serverStats.guildID) return;  
  bot.channels.get(serverStats.totalUsersID).setName(`Nombre d'utilisateur(s): ${member.guild.memberCount}`)
  bot.channels.get(serverStats.memberCountID).setName(`Nombre de membre(s): ${member.guild.members.filter(m => !m.user.bot).size}`)
  bot.channels.get(serverStats.botCountID).setName(`Nombre de bot(s): ${member.guild.members.filter(m => m.user.bot).size}`)
  member.guild.channels.find("id", "523806907933130754").send(`:x: ${member.user.username} Est parti(e) le(la) lâche. `)
})
 
 
 bot.on('messageDelete', async (message) => {
  
  
  const logs = message.guild.channels.find(channel => channel.name === "logs");
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log(`Il n y as pas de channel logs.. Mais j'ai pas la perm de le faire.. Erf..`)
  }  
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }
  logs.send(`Un message as été supprimé dans le channel **${message.channel.name}** le message était **${message}** envoyé par **${message.author.username}**`);
 })
 
 process.on('UnhandledPromiseRejection', function(reason, p){
  console.log("")
 })
    bot.on('message', async (message) => {
    var mention = message.mentions.users.first();

if(message.content === prefix + "neko"){
    if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/lewd')

        .end((err, response) => {
      const lewdembed2 = new Discord.RichEmbed()
      .setTitle(`Nyyaaa~~ **Gémis puis ronronne proche de ton oreille**`)
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Spéciale dédi à Shinai <3`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed2});
    })
	
}
if(message.content === prefix + "fox"){
    if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/fox_girl')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("C'est cute en vrai :3")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`J'adorreeee ! #Lara`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed});
    })
	
}
if(message.content === prefix + "tetons"){
    if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/tits')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Des boooobbbssss")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Mignon tout chat ! #Lara`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed});
    })
	
}
if(message.content === prefix + "minou"){
    if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/pussy')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Grrrr :3")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Intéréssant`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed});
    })
	
}

    
if(message.content === prefix + "gneko"){
   if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Love ya Shinai <3")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`En gif c'est cool aussi :3`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed});
    })
	
}
if(message.content === prefix + "trap"){    
  if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/trap')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Trapped ! Bon, maintenant que tu y est, fait pas le(la) difficile :D")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Dédi à Sora :3`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed});
    })
	
}
if(message.content === prefix + "yuri"){
    if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/yuri')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Yuriiiiiii :3")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`Dédi à Issei :3`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed});
    })
	
}
   
   
   
   
   if (message.content === prefix + "help") {
    var help = new Discord.RichEmbed()
    .setTitle(`Salut à toi ${message.author.username} !`)
    .setColor("#120D16")
    .setDescription("Voici le menu d'aide !")
    .setImage("https://cdn.discordapp.com/attachments/508105906261721108/510264359541538826/hyperdimension-neptunia-victory-1.jpg")
    .setThumbnail("https://cdn.discordapp.com/attachments/508105906261721108/510264225180942346/5788f566eafcef6b0d2eafb9ca3a59b5650fec1c_hq.jpg")
    .addField("Tout marche avec le préfixe r!", "**help:** Affiche ce menu\n**fiche:** a venir lorsque mis à jour.\n**ping:** Permet de voir si je lag.. (Si je lag, faut taper mon développeur, c'est sa faute !)\n**debug (Utilisation développeur.):** Affiche les stats actuelles du bot.\n**ui:** Permet d'avoir des infos sur un utilisateur.\n**dev:** Infos sur mon développeur d'amour ❤\n**roll:** Fait tourner une pièce.\n**xpstat:** Pour savoir l'xp accumulée sur le serv (nombres de messages)\n**chat:** Vous affiche aléatoirement l'image d'un piti chat\n**chien:** Vous affiche aléatoirement l'image d'un piti chien\n**panda:** les pandas c'est la vie !\n**meme:** G3T M3M3D")
    .addField("Partie Staffs", "**purge:** Pour delet les messages\n**warn @mention raison:** Permet de warn un utilisateur.\n**seewarns @mention:** Voir les warns d'un utilisateur.\n**deletewarns @mention numéro du warn (Utiliser seewarns):** Pour delet un warn.")
    .addField("NSFW channels Only !", "**neko:** Bahhh, une neko (ou deux :D)\n**furry:** Furryyyyyy :D\n**neko2:** Neeeeeeeeeekoooooooooooooooo !!!\n**yuri:**Yuuurrrriii\n**yaoi:** YAAAOIII\n**tetons:** Bahhh, il te faut un dessin ?\n**minou:**Un petit minou tout ras�, ou pas\n**gneko:** Gif de nekoooo NEEKOOOOO :3\n**hentai:** Hum, euhh, mon dev veux pas que j'en parle (lis la note en bas de page de la photo quand tu ferras la commande :3 Mais chuuuttt)\n**trap:** It's a trap !")
    .addField("Fun", "**chatouille:** AH AH AH AH AH AH AH AH AH **Rigole**\n**hug @mention:** CAAALIIIINNNN :3\n**kiss @mention:** Un bisouuuu :3")




    message.channel.send({embed: help});
}

if(message.content === prefix + "hentai"){
    if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
    superagent.get('https://nekos.life/api/v2/img/hentai')
        .end((err, response) => {
      const lewdembed3 = new Discord.RichEmbed()
      .setTitle("Hentai")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`La catégorie de mon dev ! Mais chut :3`)
      .setURL(response.body.url);
  message.channel.send({embed: lewdembed3});
    })
	
}
        if(message.content === prefix + "neko2"){
  if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
  superagent.get('https://nekos.life/api/v2/img/erokemo')
      .end((err, response) => {
    const lewdembed = new Discord.RichEmbed()
    .setTitle("Elles serrons jamais nues ! Gros pervers :3")
    .setImage(response.body.url)
    .setColor(`#000000`)
    .setFooter(`J'aime bien perso. les petit zox`)
    .setURL(response.body.url);
message.channel.send({embed: lewdembed});
  })

}

if (message.content.startsWith( prefix + "cookie")) {
  if(mention == null) {return message.reply("Tu manges tes cookies seul toi ?");}
  mentionMessage = message.content.slice (8);
  message.delete()
  var cookie = new Discord.RichEmbed()
  .setTitle("Owiii")
  .setAuthor(`${message.author.username} à partagé un cookie avec toi !`)
  .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRFmKho4QGyfWJyFSYnIVkL0iX52Fds0IM-TjdQb8gdiNBwunDg")
  mention.sendMessage({embed: cookie})
  message.channel.send(`${message.author.username} Tu partages ! Cool ça ! tiens ! un cookie en plus pour toi ! <3 🍪`)
}


if (message.content.startsWith(`<@523253318038978561> Tu commence doucement à me faire chier toi`))
    message.channel.send("Moi aussi je t'aime mon chou <3")
if (message.content.startsWith(`<@523253318038978561> bon courage`))
    message.channel.send(`Avec un dev comme <@222445753484705802> ouai il m'en faut.. `)


if (message.content.startsWith( prefix + "roi")) {
  if(mention == null) {return message.reply("Pas de roi/reine :c");}
  mentionMessage = message.content.slice (8);
  let userb = message.mentions.members.first();
  message.delete()
  var roi = new Discord.RichEmbed()
  .setTitle("Owiii")
  .setAuthor(`${userb.user.username} ! ${message.author.username} t'as élu(e) roi/reine des cookies ! 👑`)
  .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRFmKho4QGyfWJyFSYnIVkL0iX52Fds0IM-TjdQb8gdiNBwunDg")
  message.channel.send({embed: roi})
  message.channel.send(`${message.author.username} Tu viens de faire l'avénement d'un nouveau(nouvelle) roi(reine)`)
}  
     
 if(message.content === prefix + 'dev')
  
  var dev = new Discord.RichEmbed()
  .setTitle(`Salut à toi, ${message.author.username}`)
  .addField("Si tu lis ceci c'est pour en savoir plus sur mon développeur. Je vais tout te dire.", "Son discord  est https://discord.gg/8QjVprZ  . Il est développeur depuis longtemps déjà. Il as déjà créée (avant de me créer moi) un bot musique, qui dois sans doutes être présent actuellement sur le serveur ou tu te situe (dans le cas contraire, désolée :/) essaie donc de faire '+help music' tu verras !")
  .addField("Que dire de plus..", "Ah si ! Il te remercie de m'avoir ajoutée sur ce serveur ! Car même si il n'est pas co, je sauvegarde toutes intéractions avec moi même ou les autres bots de Lara, ce qui fait qu'il les voies. Donc, merci ! ❤")
  .setImage('https://cdn.discordapp.com/attachments/564122682724057099/576475533991346211/thB8710GRK.jpg')
  .setThumbnail("https://cdn.discordapp.com/attachments/564122682724057099/576475533991346211/thB8710GRK.jpg")

  message.channel.send({embed: dev})

      
    
    if(message.content === prefix + "serveur")
        var serverinfo = new Discord.RichEmbed()
        .setDescription("Informations du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("créé le", message.guild.createdAt)
        .addField("Tu as rejoin le", message.member.joinedAt)
        .addField("Nombre d'utilisateurs sur le discord", message.guild.memberCount)
        .setColor("0x0000FF")
        message.channel.send({embed: serverinfo})
    
    
if(message.content.startsWith(prefix + "sondage")) {
    
    
            let usera = message.mentions.members.first();
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            let sondageChannel = message.guild.channels.find("name", "sondage");
            
            const msg = await sondageChannel.send(`@everyone`);
            
            var sondage = new Discord.RichEmbed()
                .setDescription(`Sondage lancé par ${message.author.username}`)
                .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
                .setColor(0xB40404)
                .setTimestamp()
                .setFooter(`${message.guild.name}`)
                
            await msg.edit(sondage)
            
            .then(function (message) {
                message.react("❌")
                message.react("✅")
            }).catch(function() {
            });
            
}
if(message.content === ("<@523253318038978561> c'est qui le plus beau ?"))
  message.channel.send(`Le plus beau ? c'est simple ! C'est <@222445753484705802> ! Si j'était Humain, je l'épouserais direct ! Sans hésiter ! <3 `)

    if (message.content === prefix + "gaypride")
    var gay = new Discord.RichEmbed()
    .setTitle("C'est trèss gayy")
    .setAuthor(`${message.author.username}`)
    .setImage("https://www.comprarbanderas.es/images/banderas/400/16485-orgullo-gay-philadelphia_400px.jpg")
    message.channel.send({embed: gay})



    if(message.content === prefix + "chat") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('http://aws.random.cat/meow')
      console.log(body.file)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let cEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('🐱 Piti chat ! 🐱')
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL)

        message.channel.send({embed: cEmbed})
        msg.delete()
    }
    if (message.content === prefix + "chaine")
      var youtube = new Discord.RichEmbed()
      .setAuthor(`Salut à toi ! ${message.author.username}`)
      .addField("Tu est ici pour voir la chaine commune d'Umi et Lara !", "Bon pour l'instant elle est pas prête donc, bah tu attends c:")
      .setImage("https://cdn.discordapp.com/attachments/519603011194978304/525428371769917440/image0.png")
      message.channel.send({embed: youtube})

    if(message.content === prefix + "meme") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('https://api-to.get-a.life/meme')
      console.log(body.text)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let mEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('G3T M3M3D')
        .setImage(body.url)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL)

        message.channel.send({embed: mEmbed})
        msg.delete()
    }



    if(message.content === prefix + "panda") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('https://api-to.get-a.life/pandaimg')
      console.log(body.text)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let pEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`Les pandas c'est nice !`)
        .setImage(body.link)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL)

        message.channel.send({embed: pEmbed})
        msg.delete()
    }

    if(message.content === prefix + "chien") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('https://dog.ceo/api/breeds/image/random')
      console.log(body.message)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let dEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('🐶 Piti chien ! 🐶')
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL)

        message.channel.send({embed: dEmbed})
        msg.delete()
    }

if(message.content.startsWith(prefix + "chatouille")){
            console.log("here")
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply(`Tu va pas te chatouiller toi m�me quand même ? Si ? Mentionne quelqu'un !`);

            superagent.get('https://nekos.life/api/v2/img/tickle')
                .end((err, response) => {
              const lewdembed4 = new Discord.RichEmbed()
              .setTitle(user.username + " Tu est chatouill� par " + message.author.username + "!")
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setDescription((user.toString() + " � été chatouill� par" + message.author.toString() + "!"))
              .setFooter(`'-'`)
              .setURL(response.body.url);
          message.channel.send({embed: lewdembed4});
            })
          
        }

        if(message.content.startsWith(prefix + "hug")){
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply(`Les auto calins c'est bien, mais a deux, c'est mieux ! Mentionne quelqu'un !`);

            superagent.get('https://nekos.life/api/v2/img/hug')
                .end((err, response) => {
              const lewdembed10 = new Discord.RichEmbed()
              .setTitle(user.username + " Viens de ce faire caliner par " + message.author.username)
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setDescription((user.toString() + " a eu un calin de la part de " + message.author.toString()))
              .setFooter(`c'est KROOO CUUUTTTEEEE`)
              .setURL(response.body.url);
          message.channel.send({embed: lewdembed10});
            })
          
        }
        if(message.content.startsWith(prefix + "pat")){
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply('Gneugneu tu peux pas te pat pat tout seul !');

            superagent.get('https://nekos.life/api/v2/img/pat')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(user.username + " c'est fait pat pat par " + message.author.username)
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setDescription((user.toString() + " viens de pat pat " + message.author.toString()))
              .setFooter(`owo`)
              .setURL(response.body.url);
          message.channel.send({embed: lewdembed});
            })
          
        }
        if(message.content.startsWith(prefix + "kiss")){
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply(`Tu peux pas t'embrasser tout seul, baka`);

            superagent.get('https://nekos.life/api/v2/img/kiss')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setTitle(user.username + " Viens de ce faire embrasser par " + message.author.username)
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setFooter(`Et mwa ? :c`)
              .setURL(response.body.url);
          message.channel.send({embed: lewdembed});
            })
          
        }
        if(message.content === prefix + "yaoi"){
          if (!message.channel.nsfw) return message.channel.send(`Oulah doucement, ce n'est pas dans un channel NSFW !`)
          if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('Nah nah ! Pas le droit de te montrer ça ! Même dans les canaux NSFW :/');
          var hentai = "sex"
          var query = "yaoi";
          booru.search('gelbooru', [query], {nsfw: true, limit: 1, random: true })
              .then(booru.commonfy)
              .then(images => {
                  for (let image of images) {
                      const embed = new Discord.RichEmbed()
                      .setTitle("Hentai:")
                      .setImage(image.common.file_url)
                      .setColor('#000000')
                      .setFooter(`Tags: ${query}`)
                      .setURL(image.common.file_url);
                      return message.channel.send({embed: embed});
                  }})
                }

    if(message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#F72BB0')
            .setTitle(`Xp de ${message.author.username}`)
            .setDescription("Voilà toute l'xp accumulée !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    
    
    }
    if(message.content === prefix + "debug"){ 
      var embed10 = new Discord.RichEmbed()
      .setAuthor(`${bot.user.username}`)
      .setColor("RANDOM")
      .setThumbnail(bot.user.avatarURL) 
      .addField("📋Nom du bot", bot.user.tag, true)
      .addField("🆔ID", bot.user.id, true)
      .addField("🤖Version","0.0.1beta", true)
      .addField("✏librairie", "Discord.js",true)
      .addField("📔Version discord.js", Discord.version, true)
      .addField("🔐Node", process.version, true)
      .addField("❔Présent sur ", bot.guilds.size + " serveurs", true)
      .addField("🖥OS", process.platform, true)
      .addField("🚅Ram" , `${Math.round(process.memoryUsage().heapUsed / 1000000)}MB`, true)
      .addField("🕧En ligne depuis",(Math.round(bot.uptime / (1000 * 60 * 60 * 24)) % 30) + " Jours, " + (Math.round(bot.uptime / (1000 * 60 * 60))) + " h, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " min, et " + (Math.round(bot.uptime / 1000) % 60) + " sec", true)
      .addField("🔥CPU", Math.ceil(cpu[1] * 100) / 10 + "%",true)
      .addField("⚙Config", `(${os.arch()}) ${os.cpus()[0].model} @ ${os.cpus()[0].speed} MHz`, true)
      message.channel.send({embed: embed10});
    }

    
    
    if(message.content === prefix + 'roll') {      
      var coin = Math.floor(Math.random() * 2);
        if(coin === 0) {
            coin = 'pile'
        };
        if(coin === 1) {
            coin = 'face'
        };
        message.channel.send('La pièce tourne... \n Et elle tombe coté **' + coin + '**.');
    };

    if (message.content === prefix + "ping") {
        var startTime = Date.now();
     message.channel.sendMessage("Calcul en cours...").then((message) => {
      var endTime = Date.now();
        message.edit("Bot : " + Math.round(endTime - startTime) + " ms\nAPI : "+Math.round(bot.ping)+" ms");
       })
   }

   if(message.author.bot) return;
             if(message.content.startsWith(prefix + "userinfo") || message.content.startsWith(prefix + "ui")) {
           
               let usera = message.mentions.members.first();
               if(!usera) return message.channel.send("Précise moi un utilisateur");
               let gameName = usera.presence.game ? usera.presence.game.name : "None";
           
           
               var embed = new Discord.RichEmbed()
               .setAuthor(usera.user.tag, usera.user.avatarURL)
               .addField("ID de l'utilisateur", usera.id, true)
               .addField("Pseudo", usera.user.username, true)
               .addField("Status actuel", usera.presence.status, true)
               .addField("Jeu", gameName, true)
               .addField("Quand à t'il join ?", usera.joinedAt, true)
               .setTimestamp()
               .setColor(0x0f7fa6)
               .setThumbnail(usera.user.avatarURL);
               message.channel.send({embed: embed});
           
               console.log("'L'info d'utilisateur à été demandé dans le serveur '" + message.guild.name + "' par " + message.author.username + " (" + message.author.id + ")");
           }


   if(message.content.startsWith(prefix + "purge")) {
       if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission.");

       let args = message.content.split(" ").slice(1);

       if(!args[0]) return message.channel.send("Précise moi un nombre de messages.")
       message.channel.bulkDelete(args[0]).then(() => {
           message.channel.send(`${args[0]} messages ont été supprimés.`)
       }
    )
   }





if (message.content.startsWith("T'est beau <@558368366340079657>"))
message.channel.send("Nion ! C'est twa ! :3")


var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch();
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionné(e) aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch();
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch();
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
    if (!message.content.startsWith(prefix)) return;
    var args= message.content.substring(prefix.length).split(" ");
    if (message.content === prefix + "ping") {
      var startTime = Date.now();
   message.channel.sendMessage("Calcul en cours...").then((message) => {
    var endTime = Date.now();
      message.edit("Bot : " + Math.round(endTime - startTime) + " ms\nAPI : "+Math.round(bot.ping)+" ms");
     })
 }
    
if(message.content.startsWith(prefix + "chatouille")){
            if(message.guild === null)return;
            const user = message.mentions.users.first();
            if(!user)
                return message.reply(`Tu va pas te chatouiller toi même quand même ? Si ? Mentionne quelqu'un !`);

            superagent.get('https://nekos.life/api/v2/img/tickle')
                .end((err, response) => {
              const lewdembed4 = new Discord.RichEmbed()
              .setTitle(user.username + " Tu est chatouillé par " + message.author.username + "!")
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setDescription((user.toString() + " à été chatouillé par" + message.author.toString() + "!"))
              .setFooter(`'-'`)
              .setURL(response.body.url);
          message.channel.send({embed: lewdembed4});
            })
          
        }


    switch (args[0].toLowerCase()){


        case "playlist":
        var playlist = new Discord.RichEmbed()
            .setTitle("Petites playlists ou musiques pour RP tranquillou ^^")
            .setAuthor(`RP - ${message.guild.name}`)
            .setThumbnail("https://media.giphy.com/media/cgW5iwX0e37qg/giphy.gif")
            .setImage("https://media.giphy.com/media/wsWcsrfMXjJgk/giphy.gif")
            .addField("Voilà les musiques, elles serons mise à jour souvent ! Enjoy", "<https://www.youtube.com/watch?v=-kBhum7f4rI> **(Musique chill, posée)**\n<https://www.youtube.com/watch?v=htCcgpisgtk> **(Du hard metal)**\n <https://www.youtube.com/playlist?list=UUqXzaPAOef97erJRijURPrQ> **(Playlist de tout genre, mais la particularitée, c'est que le son est en 3d ! Si tu connais pas, va jetter un oeil, ca vaux le détour ;))**")
            .addField("Coup de coeur de Lara !", "https://www.youtube.com/watch?v=_eDpH4hMW1o")
            .addField("Comme précisé plus haut, elle serras mise à jour souvent ! Tennez vous au courant ! :p", "Vous pouvez aussi me faire vos propositions ! go me MP ℒ𝓪𝓻𝓪 ℱ𝒆𝓷𝓻𝓲𝓻.")    
        console.log("La playlist a été demandée !")
        message.channel.send({embed: playlist})    
        
        break;

        case "ban":

        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.reply("Flèmme, car t'as pas les perms https://media.tenor.com/images/af630f8d408127ba0a0e96a62bfb4e4c/tenor.gif")
        }else{
            var banmember = message.mentions.members.first();
            if(!banmember){
                message.reply("Pas de gars avec ce nom :/");
            }else{
                banmember.ban().then((member) => {
                message.channel.send(`${member.displayName} à été ban ! En même temps, il était pas trés utile.. https://i.imgur.com/O3DHIA5.gif`);
            }) 
        
        
        
}}}})



