const { respond_interaction } = require("../discord_request");
const { pi_calc } = require("../node_modules/pi_wasm/pi_wasm.js");

async function pi(interaction) {
    let n = interaction.data.options[0].value
    let piCalculated = pi_calc(n)
    respond_interaction(interaction, {
        "embeds": [
            {
              "title": "DinoBot Does Pi",
              "type": "rich",
              "color": 0x15c7df,
              "fields": [
                {
                  "name": 'Number of fractions: ' + n,
                },
                {
                  "name": 'Pi calculated: ',
                  "value": piCalculated
                }
              ]
            }
          ]
    });
}
exports.pi = pi;