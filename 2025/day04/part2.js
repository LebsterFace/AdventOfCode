import { input, neighbours } from "../../utils.js";

const grid = input().split("\n").map(row => [...row]);

const part1 = () => {
	let count = 0;
	for (const [y, row] of grid.entries()) {
		for (const [x, cell] of row.entries()) {
			if (cell === ".") continue;
			const N = neighbours(x, y, grid).map(([nX, nY]) => grid[nY][nX]);
			const accessible = N.filter(n => n !== ".").length;
			if (accessible < 4) {
				grid[y][x] = 'x';
				count++;
			}
		}
	}

	for (const [y, row] of grid.entries()) {
		for (const [x, cell] of row.entries()) {
			if (cell === "x") {
				grid[y][x] = '.';
			}
		}
	}

	return count;
};

let total = 0;
while (true) {
	const count = part1();
	if (count === 0) break;
	total += count;
}

console.log(total);