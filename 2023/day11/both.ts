import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "").split("\n")
	.flatMap((row, y) => [...row].map((cell, x) => ({
		x, y, isGalaxy: cell === '#',
		xShift: 0, yShift: 0
	})));

const size = input.at(-1)!.x;

for (let i = 0; i < size; i++) {
	// If there are no galaxies in this column
	if (!input.some(c => c.x === i && c.isGalaxy))
		// Shift every cell after this column
		for (const c of input.filter(c => c.x > i))
			c.xShift++;
	// If there are no galaxies in this row
	if (!input.some(c => c.y === i && c.isGalaxy))
		// Shift every cell after this row
		for (const c of input.filter(c => c.y > i))
			c.yShift++;
}

const galaxies = input.filter(cell => cell.isGalaxy);

type Cell = typeof input[number];
const pairings: [Cell, Cell][] = [];
for (let first = 0; first < galaxies.length; first++) {
	for (let second = first + 1; second < galaxies.length; second++) {
		const start = galaxies[first];
		const end = galaxies[second];
		pairings.push([start, end]);
	}
}

const solve = (scale: number) => {
	let sum = 0;
	for (const [start, end] of pairings) {
		const x1 = start.x + start.xShift * scale;
		const y1 = start.y + start.yShift * scale;
		const x2 = end.x + end.xShift * scale;
		const y2 = end.y + end.yShift * scale;
		sum += Math.abs(x2 - x1) + Math.abs(y2 - y1);
	}

	return sum;
};

console.log('Part 1:', solve(1));
console.log('Part 2:', solve(999999));