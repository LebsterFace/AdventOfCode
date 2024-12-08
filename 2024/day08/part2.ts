import { findInGrid, input, pairs } from "../utils.js";

const grid = input().split("\n").map(line => line.split(""));
const y_max = grid.length - 1;
const x_max = grid[y_max].length - 1;
const inBounds = (x: number, y: number) => y >= 0 && y <= y_max && x >= 0 && x <= x_max;

const frequencies = new Set(grid.flat());
frequencies.delete(".");

for (const locations of [...frequencies].map(freq => findInGrid(grid, freq))) {
	for (const [[x1, y1], [x2, y2]] of pairs(locations)) {
		const dx = x2 - x1;
		const dy = y2 - y1;

		let aX = x1;
		let aY = y1;
		while (inBounds(aX, aY)) {
			grid[aY][aX] = '#';
			aX -= dx;
			aY -= dy;
		}

		aX += dx;
		aY += dy;

		while (inBounds(aX, aY)) {
			grid[aY][aX] = '#';
			aX += dx;
			aY += dy;
		}
	}
}

console.log(findInGrid(grid, '#').length);