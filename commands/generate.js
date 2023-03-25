const { queryImage } = require("../query")
const { defer, editDeferBuffer } = require("../discord_request");

async function generate(interaction){
    let text = interaction.data.options[0].value
    console.log("Image generate input: " + text)
    defer(interaction);
    let response = await queryImage({"inputs":text})
    while("error" in response) {
        console.log(response.error);
        sleep(25000);
        response = await query({"inputs": text});
    }
    if (response.status != 200) {
        console.log(response.error);
        return 1;
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let res = await editDeferBuffer(interaction,
        {"embeds": [{
      		"type": "rich",
      		"title": "Image Generated",
      		"color": 0x15c7df,
            "description": `Prompt: ${text}`,
      		"image": {
        		"url": "attachment://easter_egg.jpg"
      		  }
        }]}, buffer);
    return 0;
}
exports.generate = generate;
