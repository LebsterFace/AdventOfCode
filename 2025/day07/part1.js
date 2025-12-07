import { findInGrid, input } from "../../utils.js";

const grid = input().split("\n").map(r => [...r]);
const starts = findInGrid(grid, "S");
for (const [x, y] of starts) {
	grid[y][x] = "|";
}

const processed = new Set();

let splits = 0;
let change;
do {
	change = false;
	for (const [x, y] of findInGrid(grid, "|")) {
		if (!((y + 1) in grid)) continue;
		if (processed.has(`${x},${y}`)) continue;
		processed.add(`${x},${y}`);
		change = true;

		if (grid[y + 1][x] === "^") {
			grid[y + 1][x - 1] = "|";
			grid[y + 1][x + 1] = "|";
			splits++;
		} else {
			grid[y + 1][x] = "|";
		}
	}
} while (change);

console.log(splits);