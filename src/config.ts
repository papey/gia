// Imports
import * as YAML from "yamljs";

// Config class
export class Config {
  username: string;
  password: string;
  prefix: string;
  clientID: string;
  channelID: string;
  channels: string[];
  admins: string[];
  debug: boolean;

  constructor(confPath: string) {
    try {
      const conf = YAML.load(confPath);
      this.username = conf.username;
      this.password = conf.password;
      this.clientID = conf.clientID;
      this.channelID = conf.channelID;
      this.channels = conf.channels;
      this.admins = conf.admins;
      this.prefix = conf.prefix === undefined ? "!" : conf.prefix;
      this.debug = conf.debug === undefined ? false : conf.debug;
    } catch (e) {
      console.error(e.message);
    }
  }
}
