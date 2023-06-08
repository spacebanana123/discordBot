let past_user_inputs = ["How has your day been?"];
let generated = ["My day has been great! I just got back from school. How was your day?"];
const { queryConversation } = require("../query")
const { defer, editDefer } = require("../discord_request");
const { MAX_PAST_INPUTS } = require("../index");

async function respond(interaction) {
  let text = interaction.data.options[0].value
  console.log("Respond input: " + text)
  defer(interaction);
  let response = await queryConversation({
    "inputs": {
      "past_user_inputs": past_user_inputs,
      "generated_responses": generated,
      "text": text,
    },
    "parameters": {
      "min_length": 5,
      "temperature": 10.0,
    },
  });
  editDefer(interaction, {
    "embeds": [
      {
        "title": "Ask DinoBot",
        "type": "rich",
        "color": 0x15c7df,
        "fields": [
          {
            "name": 'Prompt:',
            "value": text
          },
          {
            "name": 'Reply:',
            "value": response.generated_text
          }
        ]
      }
    ]
  }
  );
  past_user_inputs.unshift(text);
  past_user_inputs.splice(MAX_PAST_INPUTS);

  generated.unshift(response.generated_text);
  generated.splice(MAX_PAST_INPUTS);
  console.log(JSON.stringify(response));
}
exports.respond = respond;