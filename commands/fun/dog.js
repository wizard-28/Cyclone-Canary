const querystring = require("querystring");
const r2 = require("r2");

module.exports.run = async (client, message, args, discord) => {
  
  // We assign our thedogapi.com API key to the "X-API-KEY" object
  let headers = {
    "X-API-KEY": process.env.DOGAPIKEY
  };
  
  // Now we assign different parameters to be used in the thedogapi.com API
  let query_params = {
    has_breeds: true, // we only want images with at least one breed data object - name, temperament etc
    mime_types: "jpg,png", // we only want static images as Discord doesn't like gifs
    size: "small", // get the small images as the size is prefect for Discord's 390x256 limit
    limit: 1 // only need one
  };
  
  // Now we convert our query_params object to a query string which can be used with thedogapi.com API
  let queryString = querystring.stringify(query_params);

  // thedogapi.com API url
  let _url = `https://api.thedogapi.com/v1/images/search?${queryString}`;
  
  // make the request passing the url, and headers object which contains the API_KEY
  let response = await r2.get(_url, { headers }).json;

  // response returns an array of dog images, we only need the first one
  let image = response[0];

  // We make an embed for the dog image.
  let dogembed = new discord.RichEmbed()
    .setColor("#845632")
    .setTitle("I present to you doggo(s)!")
    .setImage(image.url)
    .setFooter(process.env.NAME, client.user.displayAvatarURL)
    .setTimestamp();
  
  // We send the embed
  message.channel.send(dogembed);
  
}

module.exports.help = {
  name: "dog",
  syntax: "dog",
  module: "fun",
  desc: "Shows a picture of dog(s)"
}