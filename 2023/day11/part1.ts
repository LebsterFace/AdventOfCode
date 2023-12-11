import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => [...l]);

const emptyColumns = [...input[0].keys()].filter(c => input.every(r => r[c] === '.'));
const emptyRows = [...input.keys()].filter(r => input[r].every(c => c === '.'));

for (const [inserted, index] of emptyRows.entries())
	input.splice(index + inserted, 0, input[0].map(() => '.'));
for (const [inserted, index] of emptyColumns.entries()) {
	for (const row of input)
		row.splice(index + inserted, 0, ".");
}

const galaxies = input.flatMap((row, y) => row
	.map((cell, x) => cell === '#' ? [x, y] as const : null))
	.filter((x): x is [number, number] => x !== null);

const pairings: [[number, number], [number, number]][] = [];
for (let first = 0; first < galaxies.length; first++) {
	for (let second = first + 1; second < galaxies.length; second++) {
		const start = galaxies[first];
		const end = galaxies[second];
		pairings.push([start, end]);
	}
}

let sum = 0;
for (const [[x1, y1], [x2, y2]] of pairings) {
	sum += Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

console.log(sum);