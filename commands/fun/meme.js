const randompuppy = require("random-puppy");

module.exports.run = async (client, message, args, discord) => {
  
  // First we make a array of all the meme subreddits.
  const reddits = [
    "dankmemes",
    "memes",
    "MemeEconomy",
    "ComedyCemetery",
    "PrequelMemes",
    "funny"
  ];
  
  // Now we choose a random subreddit from our array of reddits
  const subreddit =
    reddits[Math.floor(Math.floor(Math.random() * reddits.length))];

  // Now we use the random-puppy module to get a image from the randomly selected subreddit.
  const meme = await randompuppy(subreddit);

  // Now we make an embed of the meme image
  const memeEmbed = new discord.RichEmbed()
    .setColor("#d6ff59")
    .setAuthor(`A meme from the ${subreddit} subreddit!`)
    .setImage(meme)
    .setTimestamp()
    .setFooter(process.env.NAME, client.user.displayAvatarURL);

  // Now we send the epic meme!
  message.channel.send(memeEmbed);
};

module.exports.help = {
  name: "meme",
  syntax: "meme",
  module: "fun",
  desc: "Shows an epic meme!"
};
