import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(line => [...line]);


type Point = `${number},${number}`;

// Extract all cells which are included in part numbers
const partNumberCells = new Set<Point>();
for (let y = 0; y < lines.length; y++) {
	const row = lines[y];
	for (let x = 0; x < row.length; x++) {
		if (!/[^\d\.]/.test(row[x])) continue;
		const neighbours = ([
			[y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
			[y, x - 1], [y, x + 1],
			[y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
		] as const).filter(([y, x]) => /\d/.test(lines[y][x]));

		for (const [y, x] of neighbours) {
			partNumberCells.add(`${x},${y}`);
		}
	}
}

// Find the leftmost digit of every part-number
const part_numbers = new Map<Point, number>();
for (const cell of partNumberCells) {
	let [x, y] = cell.split(",").map(Number);
	while (/\d/.test(lines[y][x - 1])) x--;
	const minX = x;
	while (/\d/.test(lines[y][x + 1])) x++;
	const maxX = x;

	const key: Point = `${minX},${y}`;
	if (!part_numbers.has(key)) {
		part_numbers.set(key, maxX);
	} else {
		const existing = part_numbers.get(key)!;
		if (existing !== maxX) throw new Error(`${existing} != ${maxX}`);
	}
}

let total = 0;
for (const [leftCoordinate, maxX] of part_numbers) {
	let [x, y] = leftCoordinate.split(",").map(Number);
	let digits = '';
	while (x <= maxX) {
		digits += lines[y][x];
		x++;
	}

	total += parseInt(digits);
}

console.log(total);