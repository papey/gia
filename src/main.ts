// Import main bot class
import { Gia } from "./bot";
// Argument parsing
import * as yargs from "yargs";

// Args and cli setup
let args = yargs.scriptName("GIA").version("0.1.0").help().option("config", {
  alias: "c",
  demand: true,
  default: "/etc/gia/settings.yml",
  type: "string",
}).argv;

// Create bot object
let bot = new Gia(args.config);

// Start everything
bot.run();
