import { input, int } from "../utils.js";

const puzzle = input().split("\n").map(x => x.split(""));

const scan = (x: number, y: number, dx: number, dy: number, length: number): string => {
	let x1 = x;
	let y1 = y;
	let result = '';
	while (
		x1 >= 0 && y1 >= 0 &&
		y1 < puzzle.length && x1 < puzzle[y1].length &&
		Math.abs(x1 - x) < length && Math.abs(y1 - y) < length
	) {
		result += puzzle[y1][x1];
		x1 += dx;
		y1 += dy;
	}

	return result;
};

let count = 0;
for (const [y, row] of puzzle.entries()) {
	for (const [x, cell] of row.entries()) {
		if (cell !== 'X') continue;
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx === 0 && dy === 0) continue;
				if (scan(x, y, dx, dy, 4) === 'XMAS') {
					count++;
				}
			}
		}
	}
}

console.log(count);