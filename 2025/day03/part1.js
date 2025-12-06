import { input } from "../../utils.js";

const banks = input().split("\n");

let total = 0;
for (const bank of banks) {
	let max = -Infinity;
	for (let i = 0; i < bank.length - 1; i++) {
		for (let j = i + 1; j < bank.length; j++) {
			const volts = Number(bank[i] + bank[j]);
			max = Math.max(max, volts);
		}
	}

	total += max;
}

console.log(total);