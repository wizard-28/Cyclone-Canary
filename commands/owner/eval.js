// require all the needed files.
const { inspect } = require("util");

// Start the command!
module.exports.run = async (client, message, args, discord) => {
  // A function to cleanse the message from discord, i.e. convert the message into a format that we can use in JS.
  const clean = message => {
    if (typeof message === "string")
      return message
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return message;
  };

  // Check if the owner is using this command or not.
  if (message.author.id === process.env.OWNERID) {
    // Try to evaluate what the owner wrote!
    try {
      // First get a hold of what to evaluate.
      let toEval = args.join(" ");

      // Then evaluate it.
      let evaluated = eval(toEval);

      // Check if the evaluated code is a string or not.
      if (typeof evaluated !== "string")
        evaluated = require("util").inspect(evaluated);

      // This part of code finds the time taken to evaluate the code and prints the output.
      if (toEval) {
        // Don't ask me how this part works, it just works! Be happy!
        let hrStart = process.hrtime();
        let hrDiff;
        hrDiff = process.hrtime(hrStart);
        return message.channel.send(
          `*Evaluated in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ``} ${hrDiff[1] /
            1000000}ms.*\`\`\`js\n${clean(evaluated)}\n\`\`\``,
          { maxLength: 1900 }
        );
      }

      // Check if the owner is drunken.
      else {
        return message.channel.send(
          `:rofl:  ${message.author}, did you *actually* forgot to write the code!`
        );
      }
    } catch (e) {
      // Check if the owner is drunken and is taking drugs
      message.channel.send(
        `:zany_face: ${message.author}, Error while evaluating \`${e.stack}\``
      );
    }
  }

  // Check if someone is trying to act smart!
  else {
    message.channel.send(`:smirk_cat: ${message.author}, don't even dare!`);
  }
};

module.exports.help = {
  name: "eval",
  syntax: "eval [code]",
  module: "owner",
  desc: "Execute JS code"
};
