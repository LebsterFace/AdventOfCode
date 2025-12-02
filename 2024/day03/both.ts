import { input, int } from "../../utils.js";

const instructions = input().match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g)!;
let enabled = true;

let part1 = 0;
let part2 = 0;
for (const instruction of instructions) {
	if (instruction === "do()") enabled = true;
	else if (instruction === "don't()") enabled = false;
	else {
		const product = instruction.match(/\d+/g)!.map(int).reduce((a, b) => a * b);
		part1 += product;
		if (enabled) part2 += product;
	}
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);