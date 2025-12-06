import { int } from "../../utils.js";
import { readFileSync } from "fs";

const lines = readFileSync("./input.txt", "utf-8").replaceAll("\r", "").split("\n");
const splits = [];
for (let i = 0; i < lines[0].length; i++) {
	if (lines.every(line => line[i] === " ")) {
		splits.push(i);
	}
}

const problems = lines.map(line => {
	const columns = [];
	let start = 0;
	for (const end of splits) {
		columns.push(line.slice(start, end));
		start = end + 1;
	}

	columns.push(line.slice(start));
	return columns;
});

const transpose = Array.from(problems[0], (_, i) => problems.map(r => r[i]));

let part1 = 0;
let part2 = 0;
for (const problem of transpose) {
	const numbers = problem.slice(0, -1);
	const operation = problem.at(-1).trim();
	if (numbers.some(n => n.length !== numbers[0].length)) {
		throw "!";
	}

	const transformed = [];
	for (let digit = numbers[0].length - 1; digit >= 0; digit--) {
		let result = '';
		for (const n of numbers) {
			result += n[digit];
		}

		transformed.push(int(result));
	}

	if (operation === "+") {
		part1 += numbers.map(int).reduce((a, b) => a + b);
		part2 += transformed.reduce((a, b) => a + b);
	} else {
		part1 += numbers.map(int).reduce((a, b) => a * b);
		part2 += transformed.reduce((a, b) => a * b);
	}
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);