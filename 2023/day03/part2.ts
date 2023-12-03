import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(line => [...line]);


type Point = `${number},${number}`;

// Extract all cells which are included in part numbers
const adjacentCells = new Set<Point>();
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
			adjacentCells.add(`${x},${y}`);
		}
	}
}

// Find the leftmost digit of every part-number
const part_numbers = new Map<Point, Point[]>();
for (const cell of adjacentCells) {
	let [x, y] = cell.split(",").map(Number);

	while (/\d/.test(lines[y][x - 1])) x--;
	const minX = x;
	while (/\d/.test(lines[y][x + 1])) x++;
	const maxX = x;

	const result: Point[] = [];
	for (let i = minX; i <= maxX; i++)
		result.push(`${i},${y}`);

	part_numbers.set(`${minX},${y}`, result);
}

let total = 0;
for (let y = 0; y < lines.length; y++) {
	const row = lines[y];
	for (let x = 0; x < row.length; x++) {
		if (row[x] !== '*') continue;
		const neighbours = ([
			[y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
			[y, x - 1], [y, x + 1],
			[y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
		] as const).filter(([y, x]) => /\d/.test(lines[y][x]));

		const adjacent_part_numbers = new Set<Point>();
		for (const [y, x] of neighbours) {
			const point: Point = `${x},${y}`;
			for (const [left, number_points] of part_numbers) {
				if (number_points.includes(point))
					adjacent_part_numbers.add(left);
			}
		}

		if (adjacent_part_numbers.size !== 2) continue;
		const [a, b] = [...adjacent_part_numbers].map(p => {
			let digits = '';
			for (const cell of part_numbers.get(p)!) {
				const [x, y] = cell.split(",").map(Number);
				digits += lines[y][x];
			}

			return parseInt(digits);
		});

		total += a * b;
	}
}

console.log(total);