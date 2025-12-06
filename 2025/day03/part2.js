import { input } from "../../utils.js";

const banks = input().split("\n");

let total = 0;
for (const bank of banks) {
	let max = 0;

	let lastIndex = 0;
	for (let remaining = 11; remaining >= 0; remaining--) {
		const choices = bank.slice(lastIndex, bank.length - remaining);
		const highest = Math.max(...new Set(choices));
		max *= 10;
		max += highest;
		lastIndex = bank.indexOf(highest, lastIndex) + 1;
	}

	total += max;
}

console.log(total);