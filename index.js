const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    client.user.setActivity("Make with 🖤 & ☕ by Max Zander");
    console.log(`Logged in as ${client.user.tag}!`);
});

function del(msg) {
    msg.channel.fetchMessages({
            limit: 1
        })
        .then(messages => {
            msg.channel.bulkDelete(messages);

        })
}
client.on('message', msg => {
    const purg = msg.guild.channels.find('name', 'le-purgatoire');
    const gen = msg.guild.channels.find('name', 'ardoise-public');
    const val = msg.guild.roles.find('name', 'Clients');
    const noval = msg.guild.roles.find('name', 'Ames Errantes');

    if (msg.channel == gen) {
        if (msg.content === '!discord') {
            msg.delete(1000);
            msg.reply('Vous pouvez invitez vos amis avec ce lien : \n https://discord.gg/KaUQJpU');
        }
        if (msg.content === '!youtube') {
            msg.delete(1000);
            msg.reply('La chaine du comptoire : \nhttps://www.youtube.com/channel/UCPFaB1cT8ZiC_K8WmqNJfXA?view_as=public');
        }
        if (msg.content === 'ping') {
            msg.reply('Pong!');
            msg.delete();
        }
    }
    if (msg.channel == purg) {
        if (msg.content === 'LCDA') {
            msg.member.addRole(val);
            msg.member.removeRole(noval);
            msg.delete();
        }
        if (msg.content === 'lu et approuvé') {
            msg.reply("Veux-tu des lunettes ? https://lcda.marvinbost.fr/rules.html");
        }
        if (msg.content === 'lu et accepté') {
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
            message.channel.sendMessage("Désolé, vous n'avez pas la permission d'exécuter la commande \"" + msg.content + "\"");
            return;
        } else if (!msg.channel.permissionsFor(client.user).hasPermission("MANAGE_MESSAGES")) {
            msg.channel.sendMessage("Désolé, je n'ai pas la permission d'exécuter la commande \"" + msg.content + "\"");
            return;
        }
        if (msg.channel.type == 'text') {
            msg.channel.fetchMessages({
                    limit: nb
                })
                .then(messages => {
                    msg.channel.bulkDelete(messages);
                    messagesDeleted = messages.array().length;
                    msg.channel.sendMessage("Suppression des messages réussie. Nombre total de messages supprimés: " + messagesDeleted);
                    del(msg);
                })
                .catch(err => {
                    console.log('Error while doing Bulk Delete');
                    console.log(err);
                });
        }
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'le-purgatoire');
    const noval = member.guild.roles.find('name', 'Ames Errantes');
    if (!channel) return;
    member.addRole(noval);
    channel.send(`Bienvenue ${member} ! pour être sûr que tout le monde lit bien les règles, et qu’ils les respectent vous devrez entrer une phrase qui sera inscrite dans les règles qui nous certifiera que vous les avez lus et accepté.\n Les règles : https://lcda.marvinbost.fr/rules.html`);
});

client.on('guildMemberRemove', (member) => {
    member.guild.channels.find('name', 'ardoise-public').send(`**${member.user}** est parti du serveur..... Bye Bye`);
});

client.login(process.env.TOKEN);