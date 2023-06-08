const { CHAT_MODEL_URL, HUGGINGFACE_TOKEN, IMAGE_MODEL_URL, TEXTGEN_MODEL_URL } = require("./index");


async function queryConversation(data) {
  try {
    const response = await fetch(CHAT_MODEL_URL, {
      headers: { Authorization: "Bearer " + HUGGINGFACE_TOKEN },
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("An error occurred while fetching or parsing the data:", error);
    throw new Error("Unable to process the request.");
  }
}
exports.queryConversation = queryConversation;

async function queryImage(data) {
  const response = await fetch(
    IMAGE_MODEL_URL,
    {
      headers: { Authorization: "Bearer " + HUGGINGFACE_TOKEN },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}
exports.queryImage = queryImage;

async function queryTextGen(data) {
  const response = await fetch(
    TEXTGEN_MODEL_URL,
    {
      headers: { Authorization: "Bearer " + HUGGINGFACE_TOKEN },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

exports.queryTextGen = queryTextGen;