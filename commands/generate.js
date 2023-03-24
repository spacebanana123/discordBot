const { queryImage } = require("../query")
const { defer, editDeferFile } = require("../discord_request");

async function generate(interaction){
    let text = interaction.data.options[0].value
    console.log("Image generate input: " + text)
    defer(interaction);
    let response = await queryImage({"inputs":text})
    let stream = require('fs').createReadStream("please_wait.jpg");
    let res = editDeferFile(interaction,
        {"embeds": [{
      		"type": "rich",
      		"title": "Image Generated",
      		"color": 0x15c7df,
            "description": `Prompt: ${text}`,
      		"image": {
        		"url": "attachment://please_wait.jpg"
      		  }
        }]}, stream);
    console.log(res)
    return 0;
}
exports.generate = generate;
