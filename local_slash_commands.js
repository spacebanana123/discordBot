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
    "name": "pi",
    "description": "pi of some precision",
    "options": [
      {
        "name": "precision",
        "description": "number of fractions used to calculate pi",
        "type": 4,
        "required": true,
        "min_value": 1,
        "max_value": 1000
      }
    ]
  },
  {
    "name": "wisdom",
    "description": "gives okay wisdom",
    "options": [
      {
        "name": "text",
        "description": "your question",
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