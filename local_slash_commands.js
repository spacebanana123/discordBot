const local_slash_commands = [
  {
    "name": "yo",
    "description": "replies with Yo!",
    "options": []
  },
  {
    "name": "dm",
    "description": "sends user a DM",
    "options": []
  },
  {
    "name": "respond",
    "description": "responds to message",
    "options": [
      {
        "name": "text",
        "description": "text to respond to",
        "type": 3,
        "required": true
      }
    ]
  },
  {
    "name": "generate",
    "description": "generates an image",
    "options": [
      {
        "name": "text",
        "description": "text to generated an image for",
        "type": 3,
        "required": true
      }
    ]
  },
];
exports.local_slash_commands = local_slash_commands;

const delete_list = [

]
exports.delete_list = delete_list;