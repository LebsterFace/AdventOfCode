import { input } from "../../utils.js";

const banks = input().split("\n");

let part1 = 0;
let part2 = 0;

const solve = (bank, batteries) => {
	let max = 0;

	let lastIndex = 0;
	for (let remaining = batteries - 1; remaining >= 0; remaining--) {
		const choices = bank.slice(lastIndex, bank.length - remaining);
		const highest = Math.max(...new Set(choices));
		max *= 10;
		max += highest;
		lastIndex = bank.indexOf(highest, lastIndex) + 1;
	}

	return max;
};

for (const bank of banks) {
	part1 += solve(bank, 2);
	part2 += solve(bank, 12);
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);