// Imports
// got to fetch data from Twitch API
const got = require("got");

// Const variable for api url
const api = "https://api.twitch.tv/kraken/";
// Limit for the Twitch API
const limit = 100;

// Get all followers of current channel id using a provided client id
export async function getAllFollowers(
  channelID: string,
  clientID: string
): Promise<string[]> {
  // define endpoint
  const endpoint = `${api}channels/${channelID}/follows?limit=${limit}`;

  // first request, get the 100 first followers
  const res = await got
    .get(endpoint, {
      headers: {
        "Client-ID": clientID,
        Accept: "application/vnd.twitchtv.v5+json",
      },
    })
    .catch((err) => {
      throw err;
    });

  // parse data
  let data = JSON.parse(res.body);

  // If no cursor no more data to fetch, just return
  if (data._cursor == "") {
    // return it
    return data.follows.map((f) => f.user.name);
  }

  // if not, loop to get all remaining ones
  // init a variables containing first 100 followers
  let followers = data.follows;

  // get all remaining followers
  for (let i = limit; i < data._total; i += limit) {
    let res = await got
      .get(`${endpoint}&offset=${i}`, {
        headers: {
          "Client-ID": clientID,
          Accept: "application/vnd.twitchtv.v5+json",
        },
      })
      .catch((err) => {
        throw err;
      });
    // parse json data
    let data = JSON.parse(res.body);
    // appends new followers to previous ones
    followers = followers.concat(data.follows);
  }

  // ensure all followers
  if (followers.length != data._total) {
    throw new Error("Error when getting followers");
  }

  // Return all followers name
  return followers.map((f) => f.user.name);
}
