const { respond_interaction } = require("../discord_request");
const { discord_api } = require("../index");

async function dm(interaction){
    // https://discord.com/developers/docs/resources/user#create-dm
    let c = (await discord_api.post(`/users/@me/channels`,{
        recipient_id: interaction.member.user.id
      })).data
      try{
        // https://discord.com/developers/docs/resources/channel#create-message
        let res = await discord_api.post(`/channels/${c.id}/messages`,{
          content:'Yo! I got your slash command. I am not able to respond to DMs just slash commands.',
        })
        console.log(res.data)
      }catch(e){
        console.log(e)
      }
    await respond_interaction(interaction, {
        content: `👍`,
    })
    return 0;
}
exports.dm = dm;