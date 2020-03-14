const { prefixDB, configDB } = require("../db.js");

module.exports.run = async (client, message, args, discord) => {
  const commandUser = message.member;

  // First, check if the person who uses the command is trying to troll or not.
  if (!commandUser.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      `:rolling_eyes: You don't have the permission to ban someone!`
    );

  // Who's the unlucky guy?
  const unluckyGuy = message.guild.member(message.mentions.users.first());
  const unluckyName = unluckyGuy.author.name;

  // Check if the person using this command is drunken or not.
  if (!unluckyGuy)
    return message.channel.send(
      `:rofl: Did you actually forget to mention the person to ban?`
    );

  if (!unluckyGuy.bannable)
    return message.channel.send("I can't ban that user!");

  // Check if the unworthy commandUser is trying to ban a thor!
  if (commandUser.roles.first().position < unluckyGuy.roles.first().position)
    return message.channel.send(
      `:pensive: You can't ban this guy... he's too powerful! `
    );
  // Well, all the safety procedures are completed! Now let's get into buissness.

  // Removes the space after @mention .
  args.shift();

  // Join all the words of reason.
  const reason = args.join(" ");

  // Oh, oh, almost forgot to check if the unluckyGuy is not worthy of a reason!
  if (!reason) return message.channel.send("No specific reason.");

  unluckyGuy.send(
    `:frowning: You have been banned form **${message.guild.name}**, for the reason: ${reason}!`
  );

  // Ok reporting done, now lets find a place to send this report and send it!

  // First check if logging is enabled or not.
  const loggingEnabled =
    (await configDB.fetch(`${message.guild.id}.logging`));

  if (loggingEnabled) {
    // Now find the channel's name where to send the log.
    const loggingChannelID =
      (await configDB.fetch(`${message.guild.id}.logging.channel`));

    // Now create a report of whats going on.
    const report = new discord.RichEmbed()
      .setTitle("**Ban**")
      .setColor("#c10c00")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(unluckyGuy.displayAvatarURL)
      .addField("Banned user", `${unluckyGuy} with ID: ${unluckyGuy.id}`)
      .addField("Banned by", `${message.author} with ID: ${message.author.id}`)
      .addField("Reason", reason)
      .addField("Banned in", `${message.channel}`)
      .setFooter(process.env.NAME, client.user.displayAvatarURL)
      .setTimestamp();

    // Now find the channel where to log
    const loggingChannel = await message.guild.channels.find(
      c => c.id === loggingChannelID
    );

    // Now check if the mentioned channel is deleted or not
    if (!loggingChannel) {
      // Find the prefix of the client.
      let prefix = await prefixDB.fetch(`${message.guild.id}.prefix`);

      // We want the unluckyGuy to be banned before we talk with the commandUser.
      message.guild.member(unluckyGuy).ban(reason);

      // Now lets say that we did not find the logging channel and say them to either change the logging channel or disable logging.
      message.channel.send(
        `Well I banned ${unluckyName} but I couldn't log that because I couldn't find my logging channel.\nPlease run \`${prefix}setup logging\` to configure logging features!`
      );
    } else {
      return message.channel.send("Successfully banned ${unluckyName}");
      loggingChannel.send(report);
      message.guild.member(unluckyGuy).ban(reason);
    }
  }
};

module.exports.help = {
  name: "ban",
  syntax: "ban [@mention] <reason>",
  module: "administration",
  desc: "Bans a user"
};
