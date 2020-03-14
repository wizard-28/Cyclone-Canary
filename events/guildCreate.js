const { client, discord, prefixDB, configDB } = require("../index.js");

client.on("guildCreate", async guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop: for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }
  let channel = client.channels.get(guild.systemChannelID || channelID);

  let helloEmbed = new discord.RichEmbed()
    .setColor(`#0099ff`)
    .setAuthor("Ahoy! 👋")
    .setTitle("Thanks for inviting me!")
    .setDescription(
      `My default prefix is \`${process.env.PREFIX}\`!\n You can see my list of commands through \`${process.env.PREFIX}help\`.\n My support server link is ${process.env.SERVER}`
    )
    .setTimestamp()
    .setFooter(process.env.NAME, client.user.displayAvatarURL);

  try {
    channel.send(helloEmbed);
  } catch (e) {
    console.log(e.stack);
  }
  
  guild.members.get(client.user.id).setNickname(`Cyclone Canary [.]`);
  
  prefixDB.set(`${guild.id}.name`, guild.name)
  prefixDB.set(`${guild.id}.prefix`, ".");
  
  configDB.set(`${guild.id}.name`, guild.name);
  configDB.set(`${guild.id}.logging`, false)
  
});
