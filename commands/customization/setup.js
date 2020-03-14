const { prefixDB, configDB, loggingDB } = require("../db.js");
const { checkMark } = require("../emojis.js");
const similarity = require("string-similarity");

module.exports.run = async (client, message, args, discord) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "Sorry only administrators have the power to use this command!"
    );

  const prefix = await prefixDB.fetch(`${message.guild.id}.prefix`);
  if (!args[0]) {
    const menu = new discord.RichEmbed()
      .setDescription(
        `**To start an interactive setup type \`${prefix}setup [setup]\`**`
      )
      .setColor("#3498db")
      .addField("**Prefix**", "Set the bot's prefix!", true)
      .addField("**Logging**", "Set the logging preferences!", true);

    return message.channel.send(menu);
  }

  const setups = ["prefix", "logging"];

  let setup = args[0].toLowerCase();

  const AI = similarity.findBestMatch(setup, setups);

  if (AI.bestMatch.rating >= 0.25) setup = AI.bestMatch.target;
  else return message.channel.send("Couldn't find that setup!");

  await message.delete();

  switch (setup) {
    case "prefix":
      message.delete();
      message.channel.send("What do want to set the prefix as?").then(ms => {
        const reply = new discord.MessageCollector(
          message.channel,
          m => m.author.id === message.author.id,
          { time: 100000 }
        );
        reply.on("collect", async msg => {
          await prefixDB.set(`${message.guild.id}.prefix`, msg.content);

          await msg.delete(500);
          ms.edit(
            `${client.emojis.get(checkMark)} Successfully set the prefix to \`${
              msg.content
            }\``
          ).then(m => m.delete(2000));
          message.guild.members
            .get(client.user.id)
            .setNickname(`Cyclone Canary [${msg.content}]`);

          reply.stop();
        });
      });

      break;

    case "logging":
      const filter = msg => msg.author.id === message.author.id;
      message.channel
        .send("Do you want to enable or disable logging?")
        .then(msg1 => {
          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 100000,
              errors: ["time"]
            })
            .then(collected => {
              const replies = ["enable", "disable"];
              let reply = collected.first().content;
              const AI = similarity.findBestMatch(reply, ["enable", "disable"]);

              if (AI.bestMatch.rating >= 0.25) reply = AI.bestMatch.target;
              else
                return message.channel.send(
                  "Answer `enable` or `disable` next time!"
                );
              collected
                .first()
                .delete(250)
                .then(() => {
                  switch (reply) {
                    case "enable":
                      configDB.set(`${message.guild.id}.logging`, true);
                      msg1.edit("Where do you want me to log").then(msg2 => {
                        message.channel
                          .awaitMessages(filter, {
                            maxMatches: 1,
                            time: 100000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            const channelID = collected
                              .first()
                              .mentions.channels.first().id;
                            if (!channelID) {
                              msg2.edit("Enter a valid channel next time!");
                              msg2.delete(3000);
                            }
                            configDB.set(
                              `${message.guild.id}.logging.channel`,
                              channelID
                            );
                            collected
                              .first()
                              .delete(500)
                              .then(() => {
                                msg2.edit(
                                  `${client.emojis.get(
                                    checkMark
                                  )} Successfully set the logging channel to ${
                                    collected.first().content
                                  }`
                                );
                                msg1.delete(3000);
                              });
                          });
                      });
                      break;
                    case "disable":
                      configDB.set(`${message.guild.id}.logging`, false);
                      configDB.delete(`${message.guild.id}.logging.channel`);
                      msg1
                        .edit(
                          `${client.emojis.get(
                            checkMark
                          )} Successfully disabled logging!`
                        )
                        .then(msg3 => msg3.delete(3000));
                      break;
                  }
                });
            });
        });
  }
};

module.exports.help = {
  name: "setup",
  syntax: "setup [args]",
  module: "customization",
  desc: "Starts an interactive setup for bot features."
};
