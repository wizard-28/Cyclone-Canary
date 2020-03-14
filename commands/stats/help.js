const { prefixDB } = require("../db.js");
const similarity = require("string-similarity");

module.exports.run = async (client, message, args, discord) => {
  let ownerMode = false;
  if (message.author.id === process.env.OWNERID) ownerMode = true;

  const prefix = await prefixDB.fetch(`${message.guild.id}.prefix`);

  if (!args[0]) {
    const menu = new discord.RichEmbed()
      .setDescription(
        `**To access a help module, type \`${prefix}help [module]\`**`
      )
      .setColor("#3498db")
      .addField("**Administration**", "Commands for administration!", true)
      .addField("**Customization**", "Commands for customizing the bot!", true)
      .addField("**Fun**", "Commands for fun!", true);
    if (ownerMode) menu.addField("**Owner**", "Commands for the owner!", true);
    menu
      .addField("**Information**", "Commands for giving information!", true)
      .addField("**Feedback**", "Commands for giving feedbck about the bot!", true);

    return message.channel.send(menu);
  }

  let module = args[0].toLowerCase();

  const modules = [
    "administration",
    "customization",
    "feedback",
    "fun",
    "owner",
    "information"
  ];

  const AI = similarity.findBestMatch(module, modules);

  if (AI.bestMatch.rating >= 0.25) module = AI.bestMatch.target;
  else return message.channel.send("Couldn't find the module!");

  if (similarity.compareTwoStrings(args[0], "stonks") > 0.4)
    return message.channel.send("Couldn't find the module!");
  if (similarity.compareTwoStrings(args[0], "fawn") > 0.4) module = "fun";

  switch (module) {
    case "administration":
      message.channel.send({
        embed: {
          title: "Administration",
          color: 16711680,
          description: client.commands
            .map(c => {
              if (c.help.syntax && c.help.module === "administration")
                return `\`${prefix}${c.help.syntax}\` - ${c.help.desc}`;
            })
            .join("\n")
        }
      });
      break;

    case "customization":
      message.channel.send({
        embed: {
          title: "Customization",
          color: 3665243,
          description: client.commands
            .map(c => {
              if (c.help.syntax && c.help.module === "customization")
                return `\`${prefix}${c.help.syntax}\` - ${c.help.desc}`;
            })
            .join("\n")
        }
      });
      break;

    case "fun":
      message.channel.send({
        embed: {
          title: "Fun",
          color: 16120847,
          description: client.commands
            .map(c => {
              if (c.help.syntax && c.help.module === "fun")
                return `\`${prefix}${c.help.syntax}\` - ${c.help.desc}`;
            })
            .join("\n")
        }
      });
      break;

    case "owner":
      if (!ownerMode)
        return message.channel.send(
          "You are not the part of Team-Cyclone, so you can't access this module!"
        );
      message.channel.send({
        embed: {
          title: "Owner",
          color: 991989,
          description: client.commands
            .map(c => {
              if (c.help.syntax && c.help.module === "owner")
                return `\`${prefix}${c.help.syntax}\` - ${c.help.desc}`;
            })
            .join("\n")
        }
      });
      break;

    case "information":
      message.channel.send({
        embed: {
          title: "Information",
          color: 1176280,
          description: client.commands
            .map(c => {
              if (c.help.syntax && c.help.module === "stats")
                return `\`${prefix}${c.help.syntax}\` - ${c.help.desc}`;
            })
            .join("\n")
        }
      });
      break;

    case "feedback":
      message.channel.send({
        embed: {
          title: "Feedback",
          color: 8606412,
          description: client.commands
            .map(c => {
              if (c.help.syntax && c.help.module === "feedback")
                return `\`${prefix}${c.help.syntax}\` - ${c.help.desc}`;
            })
            .join("\n")
        }
      });
      break;
  }
};

module.exports.help = {
  name: "help",
  syntax: "help",
  module: "stats",
  desc: "Shows you this menu"
};
