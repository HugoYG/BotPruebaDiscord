const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });
client.on("ready", async() => {
    console.log("GrandeSastre")
})
client.login("ODY3NzA1NzM1MDA5MDA5Njc0.YPk_8A.AxJvPsY8mBFfxuBcMoZnZ5CzhpI")