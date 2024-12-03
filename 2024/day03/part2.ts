import { input, int } from "../utils.js";

const instructions = input().match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g)!;
let enabled = true;
let sum = 0;
for (const instruction of instructions) {
	if (instruction === "do()") enabled = true;
	else if (instruction === "don't()") enabled = false;
	else if (enabled) sum += instruction.match(/\d+/g)!.map(int).reduce((a, b) => a * b);
}

console.log(sum);