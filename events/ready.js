const { client } = require("../index.js");

client.login(process.env.TOKEN);
client.on("ready", () => {
  console.log("[Status] I am online now!");
});
