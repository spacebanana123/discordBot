const { respond_interaction } = require("../discord_request");
const Big = require('big.js');

async function falling_factorial(n, k) {
	let result = new Big(1);
	for (let i = new Big(0); i < k; i++) {
		result = result.times(n - i);
	}
	return result;
}

async function factorial(n) {
	let result = new Big(1);
	for (let i = new Big(0); i < n; i++) {
		result = result.times(n - i);
	}
	return result;
}

async function coefficient(n, k) {
	return (await falling_factorial(n, k)).div(await factorial(k));
}

async function nth_term(n, r) {
	let k = new Big(-1);
	let x = new Big(r.pow(2 * n + 1))
	k = k.pow(n)
	k = k.times(await coefficient(r, n))
	k = k.times(x)
	k = k.div(2 * n + 1)
	return k;
}

async function pi_calc(n) {
	let result = new Big(0)
	let three = new Big(3)
	let eight = new Big(8)
	let r = new Big(0.5)
	for (let i = 0; i < n; i++){
		result = result.add(await nth_term(i, r))
	}
	result -= three.sqrt().div(eight)

	return result*12
}

async function pi(interaction) {
	let n = interaction.data.options[0].value
	let piCalculated = await pi_calc(n)
	console.log(piCalculated)
	let x = await respond_interaction(interaction, {
		"embeds": [
			{
				"title": "DinoBot Does Pi",
				"type": "rich",
				"color": 0x15c7df,
				"fields": [
					{
						"name": 'Number of fractions: ' + n,
					},
					{
						"name": 'Pi calculated: ',
						"value": piCalculated
					}
				]
			}
		]
	});
	console.log(x)
}
exports.pi = pi;