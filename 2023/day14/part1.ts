import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => [...l]);

for (let startY = 1; startY < input.length; startY++) {
	for (let x = 0; x < input[startY].length; x++) {
		const cell = input[startY][x];
		if (cell !== "O") continue;
		let y = startY;
		while (y > 0 && input[y - 1][x] === '.') {
			y--;
		}

		input[startY][x] = '.';
		input[y][x] = 'O';
	}
}

console.log(input
	.map(row => row.filter(x => x === 'O').length)
	.map((count, index) => count * (input.length - index))
	.reduce((a, b) => a + b));