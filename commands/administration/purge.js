const { checkMark } = require("../emojis.js");

module.exports.run = async (client, message, args, discord) => {
  //function getEmoji(id) {
    //return client.emojis.find(emoji => emoji.id === id);
  //}
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      `:rolling_eyes: You don't have permission to purge messages!`
    );
  if (!args[0])
    return message.channel.send(
      `:joy: Man, you forgot to state the number of messages to purge!`
    );

  let noofmsg = parseInt(args[0], 10);

  message.channel.bulkDelete(noofmsg + 1).then(() => {
    message.channel
      .send(`${client.emojis.get(checkMark)} Successfully cleared ${args[0]} messages!`)
      .then(msg => msg.delete(5000));
  });
};

module.exports.help = {
  name: "purge",
  syntax: "purge [Number of messages]",
  module: "administration",
  desc: "Delete a certain number of messages from channel"
};
