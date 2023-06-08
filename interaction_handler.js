const { yo } = require("./commands/yo")
const { dm } = require("./commands/dm")
const { respond } = require("./commands/respond")
const { generate } = require("./commands/generate")
const { ping } = require("./discord_request")
const { wisdom } = require("./commands/wisdom")

async function handle_interaction(interaction) {
    console.log("Interaction received")
    if (interaction.type == 1) {
        // Ping
        console.log("Ping received")
        ping(interaction);
    }
    if (interaction.type == 2) {
        // Application Command
        console.log(interaction.data.name)
        switch (interaction.data.name) {
            case 'yo':
                await yo(interaction);
                break;
            case 'dm':
                await dm(interaction);
                break;
            case 'respond':
                await respond(interaction);
                break;
            case 'generate':
                await generate(interaction);
                break;
            case 'wisdom':
                await wisdom(interaction);
                break;
            default:
                console.log("Unknown command: " + interaction.data.name)
        }
    }
}
exports.handle_interaction = handle_interaction;