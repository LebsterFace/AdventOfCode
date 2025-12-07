import { findInGrid, input } from "../../utils.js";

const grid = input().split("\n").map(r => [...r]);

const memo = new Map();
const timelines = (x, y) => {
	const key = `${x},${y}`;
	if (memo.has(key)) {
		return memo.get(key);
	}

	while (grid[y][x] !== "^") {
		if (y < grid.length - 1) {
			y++;
		} else {
			return 1;
		}
	}

	const total = timelines(x - 1, y) + timelines(x + 1, y);
	memo.set(key, total);
	return total;
};

const [[X, Y]] = findInGrid(grid, "S");
console.log(timelines(X, Y));