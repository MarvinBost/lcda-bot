const Discord = require('discord.js');
const https = require("https")
const client = new Discord.Client();


client.on('ready', () => {
    client.user.setActivity("Make with 🖤 & ☕ by Max Zander");
    console.log(`Logged in as ${client.user.tag}!`);
});

function del(msg, nb) {
    msg.channel.fetchMessages({
            limit: nb
        })
        .then(messages => {
            msg.channel.bulkDelete(messages);

        })
}
client.on('message', msg => {
    const purg = msg.guild.channels.find(channels => channels.name === 'le-purgatoire');
    const gen = msg.guild.channels.find(channels => channels.name === 'ardoise-public');
    const log = msg.guild.channels.find(channels => channels.name === 'salle-reseaux');
    const val = msg.guild.roles.find(roles => roles.name === 'Clients');
    const noval = msg.guild.roles.find(roles => roles.name === 'Ames Errantes');

    if (msg.channel == gen) {
        if (msg.content === '!discord') {
            msg.delete(1000);
            msg.reply('Vous pouvez invitez vos amis avec ce lien : \n https://discord.gg/KaUQJpU');
        }
        if (msg.content === '!youtube') {
            msg.delete(1000);
            msg.reply('La chaine du comptoire : \nhttps://www.youtube.com/channel/UCPFaB1cT8ZiC_K8WmqNJfXA?view_as=public');
        }
        if (msg.content.startsWith("!multi")) { // !multi 5 x 6
            let args = msg.content.slice(6).split(' ');
            try {
                if (isNaN(parseInt(args[1])) == true) {
                    throw "le premier chiffre n'es pas un chiffre"
                }
                if (isNaN(parseInt(args[3])) == true) {
                    throw "le deuxième chiffre n'es pas un chiffre"
                }
            } catch (err) {
                msg.reply(err)
            }
            msg.reply('le resultat est : ' + (parseInt(args[1]) + parseInt(args[3])))
            msg.delete();
        }
    }
    if (msg.channel == purg) {
        if (msg.content === 'Topsy Kretts' || msg.content === 'topsy kretts') {
            del(msg, 2);
            msg.member.addRole(val);
            log.send(`${msg.member.displayName} a accepté les règles !`);
            msg.member.removeRole(noval);

        }
        if (msg.content === 'LCDA') {
            msg.reply("Veux-tu des lunettes ? https://lcda.marvinbost.fr/rules.html");
        }
        if (msg.content === 'lu et accepter') {
            msg.reply("Tiens le lien tu peux lire les règles ? https://lcda.marvinbost.fr/rules.html");
        }
        if (msg.content === 'accepté') {
            msg.reply("Est-ce que tu le fais exprès ou tu as juste étais bercée trop prés du mur ? https://lcda.marvinbost.fr/rules.html");
        }
    }
    if (msg.content.startsWith("!prune")) {
        var nb = msg.content.substr(6);
        nb++;

        if (!msg.channel.permissionsFor(msg.author).hasPermission("MANAGE_MESSAGES")) {
            message.channel.send("Désolé, vous n'avez pas la permission d'exécuter la commande \"" + msg.content + "\"");
            return;
        } else if (!msg.channel.permissionsFor(client.user).hasPermission("MANAGE_MESSAGES")) {
            msg.channel.send("Désolé, je n'ai pas la permission d'exécuter la commande \"" + msg.content + "\"");
            return;
        }
        if (msg.channel.type == 'text') {
            msg.channel.fetchMessages({
                    limit: nb
                })
                .then(messages => {
                    msg.channel.bulkDelete(messages);
                    messagesDeleted = messages.array().length;
                    msg.channel.send("Suppression des messages réussie. Nombre total de messages supprimés: " + messagesDeleted);
                    del(msg, 1);
                })
                .catch(err => {
                    console.log('Error while doing Bulk Delete');
                    console.log(err);
                });
        }
    }
    if (msg.content === '!purge') {
        if (!msg.channel.permissionsFor(msg.author).hasPermission('KICK_MEMBERS')) {
            console.log("l'utilisateur :" + msg.author.displayName + "a essayer de faire une purge mais n'as pas la permission");
            return
        }
        let list = msg.guild.roles.find(roles => roles.name === 'Clients').members;
        list.map(member => member.removeRole(val));
        list.map(member => member.addRole(noval));
        console.log("Une purge a été faite");
    }
    if (msg.content.startsWith("!lcda")) {
        var usr = msg.content.substr(6);
        https.get(
            `https://r6.apitab.com/search/uplay/${usr}`,
            resp => {
                let data = "";
                resp.on("data", chunk => {
                    data += chunk;
                });
                resp.on("end", () => {
                    json = JSON.parse(data);
                    console.log(json.players[Object.keys(json.players)].profile.p_name);
                    const exampleEmbed = new Discord.RichEmbed()
                        .setColor("#2ecc71")
                        .setTitle(`${json.players[Object.keys(json.players)].profile.p_name} Stats`)
                        .setURL(`https://r6tab.com/player/${json.players[Object.keys(json.players)].profile.p_user}`)
                        .setAuthor(
                            `LCDA R6Stats`,
                            `http://ubisoft-avatars.akamaized.net/${json.players[Object.keys(json.players)].profile.p_user}/default_256_256.png`,
                            `https://r6tab.com/player/${json.players[Object.keys(json.players)].profile.p_user}`
                        )
                        .setDescription("Statistiques des ranked de cette saison")
                        .setThumbnail(
                            `https://cdn.tab.one/r6/images/ranks/?rank=${json.players[Object.keys(json.players)].ranked.rank}&champ=0`
                        )
                        .addField("MMR actuel", `${json.players[Object.keys(json.players)].ranked.mmr}`)
                        .addBlankField()
                        .addField("Wins", `bientôt de nouveau disponible`, true)
                        .addField("Losses", `bientôt de nouveau disponible`, true)
                        .addField("Kills", `bientôt de nouveau disponible`, true)
                        .addField("Deaths", `bientôt de nouveau disponible`, true)
                        .addField("Seasonal K/D", `${json.players[Object.keys(json.players)].ranked.kd}`, true)
                        .addBlankField()
                        .setTimestamp()
                        .setFooter(
                            "Bot LCDA creer par Max Zander",
                            "https://raw.githubusercontent.com/MarvinBost/LCDA/master/media/LCDA.ico"
                        );
                    msg.channel.send(exampleEmbed);
                    resp.on("error", err => {
                        console.log("Error: " + err.message);
                    });
                });
                resp.on("error", err => {
                    console.log("Error: " + err.message);
                });
            }
        );

    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channels => channels.name === 'le-purgatoire');
    const noval = member.guild.roles.find(roles => roles.name === 'Ames Errantes');
    if (!channel) return;
    member.addRole(noval);
    channel.send(`Bienvenue ${member} ! pour être sûr que tout le monde lit bien les règles, et qu’ils les respectent vous devrez entrer une phrase qui sera inscrite dans les règles qui nous certifiera que vous les avez lus et accepté.\n Les règles : https://lcda.marvinbost.fr/rules.html`);
});

client.on('guildMemberRemove', (member) => {
    member.guild.channels.find(channels => channels.name === 'ardoise-public').send(`**${member.displayName}** est parti du serveur..... Bye Bye`);
});
client.login(process.env.TOKEN);