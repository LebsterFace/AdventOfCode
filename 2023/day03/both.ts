// Algorithm:
// 1. Read and parse input (basic)
import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(line => [...line]);

const neighbours = (x: number, y: number) => [
	[y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
	[y, x - 1], [y, x + 1],
	[y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
] as const;

type Point = `${number},${number}`;
const part_numbers = new Map<Point, number>;

let total_gear_ratio = 0;
for (let y = 0; y < lines.length; y++) {
	const row = lines[y];
	for (let x = 0; x < row.length; x++) {
		if (!/[^\d\.]/.test(row[x])) continue;
		const number_neighbours = neighbours(x, y)
			.filter(([y, x]) => /\d/.test(lines[y][x]))
			.map(([y, x]) => {
				// Find the leftmost coordinate of the number
				while (/\d/.test(lines[y][x - 1])) x--;
				return [y, x];
			});

		const unique_number_neighbours = new Set<Point>();
		for (const [y, x] of number_neighbours) {
			unique_number_neighbours.add(`${x},${y}`);

			// Extract the value of the number
			let x2 = x;
			let digits = '';
			while (/\d/.test(lines[y][x2])) {
				digits += lines[y][x2];
				x2++;
			}

			part_numbers.set(`${x},${y}`, parseInt(digits));
		}

		if (row[x] === '*' && unique_number_neighbours.size === 2) {
			const [a, b] = [...unique_number_neighbours].map(k => part_numbers.get(k)!);
			total_gear_ratio += a * b;
		}
	}
}

console.log('Part 1:', [...part_numbers.values()].reduce((a, b) => a + b));
console.log('Part 2:', total_gear_ratio);