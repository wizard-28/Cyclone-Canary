const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://cyclone-canary.glitch.me`);
}, 280000);
//-----------------------------------------------------------------------------------------------
// All the JS imports
const discord = require("discord.js");
const fs = require("fs");
const database = require("quick.db");

// Initialializing the bot
console.log("[Status] Initializing...");
const client = new discord.Client();
client.commands = new discord.Collection();

// Initialize the different tables of the database
const configDB = new database.table("Configuration");
const prefixDB = new database.table("Prefixes");
const loggingDB = new database.table("Logging");

// Dynamic status changer
client.setInterval(() => {
  let Status = [`${client.guilds.size} servers!`, `c!help`, `V0.0.8`];

  client.user.setActivity(Status[Math.floor(Math.random() * Status.length)], {
    type: "WATCHING"
  });
}, 60 * 1000);

require("./Handler")(client);

module.exports = {
  client: client,
  discord: discord,
  configDB: configDB,
  prefixDB: prefixDB,
  loggingDB: loggingDB
};
