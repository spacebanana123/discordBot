
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN
const CHAT_MODEL_URL = process.env.CHAT_MODEL_URL
const MAX_PAST_INPUTS = process.env.MAX_PAST_INPUTS
const IMAGE_MODEL_URL = process.env.IMAGE_MODEL_URL
const TEXTGEN_MODEL_URL = process.env.TEXTGEN_MODEL_URL
exports.APPLICATION_ID = APPLICATION_ID
exports.HUGGINGFACE_TOKEN = HUGGINGFACE_TOKEN
exports.CHAT_MODEL_URL = CHAT_MODEL_URL
exports.MAX_PAST_INPUTS = MAX_PAST_INPUTS
exports.IMAGE_MODEL_URL = IMAGE_MODEL_URL
exports.TEXTGEN_MODEL_URL = TEXTGEN_MODEL_URL

const axios = require('axios')
const express = require('express');
const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers": "Authorization",
    "Authorization": `Bot ${TOKEN}`
  }
});
exports.discord_api = discord_api;
const { verifyKeyMiddleware } = require('discord-interactions');
const { local_slash_commands, delete_list } = require("./local_slash_commands")
const { handle_interaction } = require("./interaction_handler")

const app = express();
// app.use(bodyParser.json());


app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;
  await handle_interaction(interaction);
  console.log("Interaction handled")
  return res.status(200).end();
});

app.get('/register_commands', async (req, res) => {
  let slash_commands = local_slash_commands
  try {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/commands`,
      slash_commands
    )
    console.log(discord_response.data)
    return res.send('commands have been registered')
  } catch (e) {
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})

app.get('/delete_commands', async (req, res) => {
  try {
    let commands = await discord_api.get(`/applications/${APPLICATION_ID}/commands`)
    let command_ids = commands.data.map((command) => command.id)
    for (let i = 0; i < command_ids.length; i++) {
      let command_id = command_ids[i]
      if (delete_list.includes(commands.name)) {
        console.log(`Deleting ${commands.name}`)
        await discord_api.delete(`/applications/${APPLICATION_ID}/commands/${command_id}`)
      }
      else {
        console.log(`Not deleting ${commands.name}`)
      }
    }
  }
  catch (e) {
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})


app.get('/', async (req, res) => {
  return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

