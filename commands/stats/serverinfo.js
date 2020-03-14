module.exports.run = async (client, message, args, discord) => {
  const serverembed = new discord.RichEmbed()
    .setTitle("Server Information")
    .setColor("#0060fc")
    .setThumbnail(message.guild.iconURL)
    .addField("Server name", message.guild.name, true)
    .addField("Region", message.guild.region, true)
    .addField("Created on", `${message.guild.createdAt.toLocaleDateString()} at ${message.guild.createdAt.toLocaleTimeString()}`, true)
    .addField("You joined", `${message.guild.createdAt.toLocaleDateString()} at ${message.guild.createdAt.toLocaleTimeString()}`, true)
    .addField("Total Members", `Users: ${message.guild.members.filter(member => !member.user.bot).size} | Bots: ${message.guild.members.filter(member => member.user.bot).size}`, true)
    .setFooter(process.env.NAME, client.user.displayAvatarURL)
    .setTimestamp();
  
  message.channel.send(serverembed);
  
}

module.exports.help = {
  name: "serverinfo",
  syntax: "serverinfo",
  module: "stats",
  desc: "Shows informationthe server"
}