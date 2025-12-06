import { input, neighbours } from "../../utils.js";

const grid = input().split("\n").map(row => [...row]);
let count = 0;
for (const [y, row] of grid.entries()) {
	for (const [x, cell] of row.entries()) {
		if (cell === ".") continue;
		const N = neighbours(x, y, grid).map(([nX, nY]) => grid[nY][nX]);
		const accessible = N.filter(n => n === "@").length;
		if (accessible < 4) {
			count++;
		}
	}
}

console.log(count);