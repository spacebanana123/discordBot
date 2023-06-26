const { respond_interaction } = require("../discord_request");
const Big = require('big.js');

function falling_factorial(n, k) {
	let result = new Big(1);
	for (let i = new Big(0); i < k; i++) {
		result = result.times(n - i);
	}
	return result;
}

function factorial(n) {
	let result = new Big(1);
	for (let i = new Big(0); i < n; i++) {
		result = result.times(n - i);
	}
	return result;
}

function coefficient(n, k) {
	return falling_factorial(n, k).div(factorial(k));
}

function nth_term(n, r) {
	let k = new Big(-1);
	let x = new Big(r.pow(2 * n + 1))
	k = k.pow(n)
	k = k.times(coefficient(r, n))
	k = k.times(x)
	k = k.div(2 * n + 1)
	return k;
}

function pi_calc(n) {
	let result = new Big(0)
	let three = new Big(3)
	let eight = new Big(8)
	let r = new Big(0.5)
	for (let i = 0; i < n; i++){
		result = result.add(nth_term(i, r))
	}
	result -= three.sqrt().div(eight)
	return result*12
}

async function pi(interaction) {
	let n = interaction.data.options[0].value
	let piCalculated = pi_calc(n)
	respond_interaction(interaction, {
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
}
exports.pi = pi;