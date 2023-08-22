const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Bot online !!"));

app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);

require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

client.config = require("../config.json");
client.db = require("../db");

// Functions
const functionsFolders = readdirSync("./src/functions");
for (const folder of functionsFolders) {
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
    (file) => file.endsWith(".js")
  );
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(process.env.TOKEN);