const { queryTextGen } = require("../query")
const { defer, editDefer } = require("../discord_request");

async function wisdom(interaction) {
    let text = interaction.data.options[0].value
    console.log("Wisdom input: " + text)
	defer(interaction);
	let response = await queryTextGen({
		"inputs": `The a wise old person which knows all was asked "${text}" and the mage responded, `,
		"parameters": {
			"max_new_tokens": 100,
			"temperature": 0.5,
			"max_time": 2.0
		}
	});
	editDefer(interaction, {
		"embeds": [
			{
			  "title": "Ask DinoBot",
			  "type": "rich",
			  "color": 0x15c7df,
			  "fields": [
				{
				  "name": 'Question:',
				  "value": text
				},
				{
				  "name": 'Wisdom:',
				  "value": response.generated_text
				}
			  ]
			}
		  ]
		}
	);
	console.log(response)
}
exports.wisdom = wisdom;