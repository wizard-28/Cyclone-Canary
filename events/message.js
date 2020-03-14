const { client, discord, prefixDB} = require("../index.js");
const similarity = require("string-similarity");

client.on("message", async message => {
  
  let prefixes = ["c!", "@Cylcone Canary"]
  
  let fetched = await prefixDB.fetch(`${message.guild.id}.prefix`);
  if(fetched) prefixes = [fetched, "@Cyclone Canary"]

  if (message.author.bot || message.channel.type === "dm") return;

  for (let i = 0; i < prefixes.length; i++) {
    if (message.content.startsWith(prefixes[i])) {
      let args = message.content
        .slice(prefixes[i].length)
        .trim()
        .split(/ +/g);
      let cmd = args.shift().toLowerCase();
      
      
      const cmds = ["ban", "purge", "setup", "suggest", "cat", "dog", "meme", "say", "eval", "botinfo", "help", "ping", "serverinfo"]

      const AI = similarity.findBestMatch(cmd, cmds);
      
      if(AI.bestMatch.rating >= 0.25)
        cmd = AI.bestMatch.target;
      
      let commandfile = client.commands.get(cmd);
      if (commandfile) {
        commandfile.run(client, message, args, discord);
      } else {
        return;
      }
      //args = message.content.slice(16).trim().split(/ +/g);
    }

    // if (
    //   message.content.startsWith(prefix) ||
    //   message.content.startsWith(`@Cyclone Canary `)
    // )
  }
});
