require('dotenv').config();
const {Client, GatewayIntentBits, Partials} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
        Partials.Channel,
    ],
});
const data = new Date();//data atual
//classe jogador
class Player {
    constructor(name,score){
        this.name=name;
        this.score=score;
    }
}
var players = [];//guardar os jogadores
var I = false;
const prefix = "!";//prefixo de coamando

client.on('ready', ()=>{
    console.log('Bot no ar');
});

client.on('messageCreate', (message)=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)){
        return;
    }
    else{
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.toLowerCase().split(' ');//argumento
        const command = args.shift().toLowerCase();//comando
        switch (command){
            case "add"://adicionar player
                if (players.length>0){
                    players.forEach(element => {
                        if(element.name==args[0]){
                            message.channel.send(`${args} já está no game`);
                        }
                    });
                    var player = new Player(args,0);
                    players.push(player);
                    if(message.author.id=="535970224646651908" && I==false){
                        message.channel.send(`Bem-vindo grande mestre ${message.author}`);
                        I = true;
                    }
                    else{
                        message.channel.send(`Bom jogo ${args}, a diversão é o que importa, porém, MicasTheMaster vai vencer.`);
                    }    
                }
            
                else{
                    var player = new Player(args,0);
                    players.push(player);
                    if(message.author.id=="535970224646651908" && I==false){
                        message.channel.send(`Bem-vindo grande mestre ${message.author}`);
                        I=true;
                    }
                    else{
                        message.channel.send(`Bom jogo ${args}, a diversão é o que importa, porém, MicasTheMaster vai vencer.`);
                    }
                }
                
            break;

            case "win"://atribuir vitória ao player
                players.forEach(element => {
                    if(element.name==args[0]){
                        element.score++;
                        if((element.score%5)==0){
                            message.channel.send(`Calma ${element}, tá brabo(a) demais, vencendo todas.`)
                        }
                        
                    }
                    
                });
            break;

            case "result"://exibindo resultados
                var messageObject = "";
                players.sort(function (a,b){
                    return (b.score - a.score);
                });
                players.forEach(element => {
                    messageObject+= element.name + "=" + element.score+"\n";
                });
                message.channel.send("```"+`${data}`+"\n*RESUMO DA RODADA*\n"+messageObject+"```");
            break;

            case "clear":
                if(message.author.id=="535970224646651908"){
                    players = [];
                }else{
                    message.channel.send("comando restrito.");
                }
        }
    }    
});
client.login(process.env.TOKEN);