module.exports.run = async (client, message, args, discord) => {
  
  const suggestionChannel = client.channels.get(process.env.SUGGESTION);
  
  if(!args[0]) return message.channel.send("You forgot to state the suggestion!");
  
  const embed = new discord.RichEmbed()
  .setTitle("Suggestion")
  .setColor("#377def")
  .addField("Suggestion By:", message.author.tag, true)
  .addField("Suggestion From:", message.guild.name, true)
  .addField("Suggestion:", args.join(" "))
  .setThumbnail(message.author.displayAvatarURL)
  .setFooter(process.env.NAME, client.user.displayAvatarURL)
  .setTimestamp()
  
  suggestionChannel.send(embed);
  
  message.channel.send("Thanks for the suggestion! Have a nice day!");
  
}

module.exports.help = { 
  name: "suggest",
  syntax: "suggest [suggestion]",
  module: "feedback",
  desc: "Sends a suggestion regarding the bot to the official bot server!"
}