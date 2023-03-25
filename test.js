const { createWriteStream } = require("fs");

const {Duplex} = require('stream'); // Native Node Module 

function bufferToStream(myBuffer) {
    let tmp = new Duplex();
    tmp.push(myBuffer);
    tmp.push(null);
    return tmp;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
async function f1() {
    query({"inputs": "a ton of bananas"}).then(async (response) => {
        while("error" in response) {
            console.log(response.error);
            sleep(25000);
            response = await query({"inputs": "a ton of bananas"});
        }
	    const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        createWriteStream("test.jpg").write(buffer);
        const stream = bufferToStream(buffer);
        stream.pipe(createWriteStream("test2.jpg"));
    });
}
f1();