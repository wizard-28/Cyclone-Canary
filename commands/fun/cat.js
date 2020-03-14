const querystring = require("querystring");
const r2 = require("r2");

module.exports.run = async (client, message, args, discord) => {
  // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
  let headers = {
    "X-API-KEY": process.env.CATAPIKEY
  };
  let query_params = {
    has_breeds: true, // we only want images with at least one breed data object - name, temperament etc
    mime_types: "jpg,png", // we only want static images as Discord doesn't like gifs
    size: "small", // get the small images as the size is prefect for Discord's 390x256 limit
    limit: 1 // only need one
  };
  // convert this obejc to query string
  let queryString = querystring.stringify(query_params);

  // construct the API Get request url
  let _url = `https://api.thecatapi.com/v1/images/search?${queryString}`;
  // make the request passing the url, and headers object which contains the API_KEY
  let response = await r2.get(_url, { headers }).json;

  let image = response[0];

  let catembed = new discord.RichEmbed()
    .setColor("#845632")
    .setTitle("I present to you cat(s)!")
    .setImage(image.url)
    .setFooter(process.env.NAME, client.user.displayAvatarURL)
    .setTimestamp();
  message.channel.send(catembed);
};

module.exports.help = {
  name: "cat",
  syntax: "cat",
  module: "fun",
  desc: "Shows a picture of cat(s)"
};
