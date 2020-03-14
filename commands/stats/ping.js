module.exports.run = async (client, message, args, discord) => {
  // Send a temporary message that the bot is processing the command and is not sleeping
  message.channel.send("Calculating").then(m => {
    // Calaculate the time between the when the temporary message was crated and a new message.
    const ping = m.createdTimestamp - message.createdTimestamp;

    // Create a report of what just happned
    let pingembed = new discord.MessageEmbed()
      .setDescription(
        `:clock2: ${ping} ms \n \n :heartbeat: ${Math.round(client.ping)} ms`
      ) // Here client.ping is the ping of the discord API.
      .setColor("#377def")
      .setFooter(process.env.NAME, client.user.displayAvatarURL)
      .setTimestamp();

    // Now update the temporary message with the new report
    m.edit(pingembed);
  });
};

module.exports.help = {
  name: "ping",
  syntax: "ping",
  module: "stats",
  desc: "Get the latency of the bot"
};
