const { InteractionResponseType } = require('discord-interactions');
const { discord_api, APPLICATION_ID } = require("./index");

async function ping(interaction) {
  return await discord_api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
    type: InteractionResponseType.PONG,
  });
}
exports.ping = ping;

async function defer(interaction) {
  console.log("defer now");
  return await discord_api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  });
}
exports.defer = defer;

async function editDefer(interaction, message) {
  return await discord_api.patch(`/webhooks/${APPLICATION_ID}/${interaction.token}/messages/@original`, message);
}
exports.editDefer = editDefer;

async function respond_interaction(interaction, message) {
  return await discord_api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: message,
  });
}
exports.respond_interaction = respond_interaction;

async function editDeferBuffer(interaction, message, buffer) {
  const FormData = require('form-data');
  const form = new FormData();
  form.append('payload_json', JSON.stringify(message));
  form.append('file', buffer, { filename: 'easter_egg.jpg' });
  return await discord_api.patch(`/webhooks/${APPLICATION_ID}/${interaction.token}/messages/@original`, form)
}
exports.editDeferBuffer = editDeferBuffer;