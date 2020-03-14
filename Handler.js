const fs = require("fs");

// The event handler.
module.exports = client => {
  fs.readdir("./events/", (err, files) => {
    if (err) console.log(`[Error] ${err.message}`);

    console.log(`[Status] Loading ${files.length} modules`);

    files.forEach(f => {
      require(`./events/${f}`);
      console.log(`[Eventlogs] ${f} loaded!`);
    });
  });

  // The command handler
  const modules = ["administration" ,"customization", "feedback", "fun", "owner", "stats"];

  console.log("[Status] Loading commands...");

  modules.forEach(c => {
    fs.readdir(`./commands/${c}/`, (err, files) => {
      if (err) console.log(`[Error] ${err.message}`);

      console.log(
        `[Commandlogs] Loaded ${files.length} commands of module, ${c}`
      );

      files.forEach(f => {
        const props = require(`./commands/${c}/${f}`);
        client.commands.set(props.help.name, props);
      });
    });
  });
};
