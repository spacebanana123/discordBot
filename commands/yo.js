const { respond_interaction } = require("../discord_request");

async function yo(interaction){
    // console.log(interaction)
    if (typeof interaction.member === 'undefined') {
        await respond_interaction(interaction, {
            content: `Yo ${interaction.user.username}!`}
        );
    } else{
        await respond_interaction(interaction, {
            content: `Yo ${interaction.member.user.username}!`}
        );
    }
    console.log("responded to yo.")
    return 0;
}
exports.yo = yo;