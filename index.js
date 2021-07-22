const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });
const fs = require('fs');

client.on("ready", async() => {
    console.log("GrandeSastre")
})
client.login("ODY3NzA1NzM1MDA5MDA5Njc0.YPk_8A.AxJvPsY8mBFfxuBcMoZnZ5CzhpI");

client.on("message", async (msg) => {
    console.log(msg.content);
    //Check if the message starts with verificame and has 2 parameters "verificame" and the code
    let msgSplitted = msg.content.split(" ");
    if(msg.content.startsWith("--verificame") && msgSplitted.length >= 2)
    {
        let codeV = msgSplitted[1];
        //             isNotANumber       isANumber
        isNaN(codeV) ? console.log(`User tried to login with code ${codeV}`) : verifyCode(codeV, msg.author.id)
        
    }
    else {
        //The message has 1, 3 or more.
    }
})

client.on("guildMemberAdd", async (member) => {
    let code=0000;
    console.log(member.id)
    let codeIsNotValid = true;
    while (codeIsNotValid) {
        let _code = generateCode(member.id);
        if(!_code){}
        else {
            codeIsNotValid = false;
            code = _code; 
        }
    }

    member.send("Bienvenido! " + await code);
    fs.readFile('./codelist.json', async(err, data) => {
        if (err) throw err;
        let data1 = JSON.parse(data);
        let pepito = await code;
        let exists = false;
        let index = 0;
        //FindTheIndex if the user is already in the list, it means the user is on the server but their is not verified
        let Findindex = data1.findIndex(function(item, i){
            if(item.UUID == member.id)
            {
                console.log(item.UUID);
                index = i;
                exists = true;
                return;
            }

          });
          console.log(index);
        //Update the code on the list  
        if(exists)
        {
            data1.splice(index, 1, {code:pepito, UUID:member.id, vericated:false})
            //Rewrite
        }
        else data1.push({code:pepito, UUID:member.id, vericated:false});
    
        var writeData = fs.writeFile("./codelist.json", JSON.stringify(data1), (err, result) => {  // WRITE
            if (err) {
                return console.error(err);
            } else {
                console.log("Success");
            }
    
        });
    });
});

async function generateCode(id){
    let code = Math.floor(1000 + Math.random() * 9000);
    //It will return false everytime code is not valid
    if(await validateCode(code, id) == true) return false;
    else return code;
}

async function validateCode(code, id){
    fs.readFile('./codelist.json', (err, data) => {
        if (err) throw err;
        let data1 = JSON.parse(data);
        data1.forEach(element => {
            //return true when code isn't valid
            if(code == element.code) return true;
            else return false;
        });
    });
}

function verifyCode(code, id) {
    fs.readFile('./codelist.json', async(err, data) => {
        if (err) throw err;
        let data1 = JSON.parse(data);
        let pepito = await code;
        let exists = false;
        let index = 0;
        //FindTheIndex if the user is already in the list, it means the user is on the server but their is not verified
        let Findindex = data1.findIndex(function(item, i){
            if(item.UUID == id && item.code == code)
            {
                index = i;
                exists = true;
                //UserVerified
            }

          });
        //Update the code on the list  
        if(exists)
        {
            data1.splice(index, 1)
            //Rewrite
        }
    
        var writeData = fs.writeFile("./codelist.json", JSON.stringify(data1), (err, result) => {  // WRITE
            if (err) {
                return console.error(err);
            } else {
                console.log("Success");
                if(exists)
                {
                    client.users.cache.get(id).send("Autenticado!");
                    return true;
                }
                else {
                    client.users.cache.get(id).send("Error!");
                    return false;
                }
            }
    
        });
    });
}

function sendMessage(id, message){
    client.users.cache.get("someID").send("someMessage");
}