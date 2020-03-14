module.exports.run = async (client, message, args, discord) => {
  let botembed = new discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#0060fc")
    .setThumbnail(client.user.displayAvatarURL)
    .addField("Version", "0..0.8", true)
    .addField("Bot name ", "<@683694923597479966>", true) // This will tag the bot
    .addField("Creator ", "Team-Cyclone", true) //Can i tag you in the bot?
    .addField(
      "Created on ",
      `${client.user.createdAt.toLocaleDateString()} at ${client.user.createdAt.toLocaleTimeString()}`,
      true
    );

  message.channel.send(botembed);
};

module.exports.help = {
  name: "botinfo",
  syntax: "botinfo",
  module: "stats",
  desc: "Shows information regarding thr bot"
};
