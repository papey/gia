// Imports
const tmi = require("tmi.js");
// get type definition for client
import { Client } from "tmi.js";
import { getAllFollowers } from "./followers";
import { Config } from "./config";

// Main bot class
export class Gia {
  // Twitch IRC client
  client: Client;
  // Config struct
  config: Config;

  constructor(configPath: string) {
    this.config = new Config(configPath);
    this.client = new tmi.Client({
      options: { debug: this.config.debug },
      connection: {
        secure: true,
        reconnect: true,
      },
      identity: {
        username: this.config.username,
        password: `oauth:${this.config.password}`,
      },
      channels: this.config.channels,
    });
  }

  // run the bot instance
  public run() {
    console.info("Running the bot instance");
    this.plug();
    console.info("Connect the bot instance");
    this.client.connect();
  }

  // map event to functions
  plug() {
    console.info("Plug functions to associated events");
    this.client.on("join", (channel, _, isSelf) => {
      if (!isSelf) {
        return;
      }

      this.client.action(channel, "Hey there ! Ready for giveaways ?!");
    });

    // on each message
    this.client.on("message", async (channel, tags, message, self) => {
      // if coming from the bot, ignore it
      if (self) return;

      // search for messages containing commands
      // giveaway selects a random follower from followers list
      // requires admin role
      if (message.toLowerCase() === `${this.config.prefix}giveaway`) {
        if (this.config.admins.some((a) => a == tags.username.toLowerCase())) {
          await getAllFollowers(this.config.channelID, this.config.clientID)
            .catch((e: Error) => this.client.say(channel, e.message))
            .then((f) => {
              const winner = f[(f.length * Math.random()) | 0];
              console.info(`Selected winner: ${winner}`);
              this.client.say(channel, `And the winner is ${winner} !`);
            });
        } else {
          this.client.say(channel, "This command requires admin privileges");
        }
      }
    });
  }
}
