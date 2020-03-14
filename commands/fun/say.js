module.exports.run = async (client, message, args, discord) => {
  const text = args.join(" ");
  
  if(!text) return message.channel.send("You forgot to type the message!");
  
  message.delete().catch();
  
  message.channel.send(text);
}

module.exports.help = {
  name: "say",
  syntax: "say [message]",
  module: "fun",
  desc: "Makes the bot send a message"
}