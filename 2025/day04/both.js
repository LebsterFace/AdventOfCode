import { input, neighbours } from "../../utils.js";

let grid = input().split("\n").map(row => [...row]);
const countRemovable = () => {
	let count = 0;
	const newGrid = grid.map(r => r.map(() => "."));
	for (const [y, row] of grid.entries()) {
		for (const [x, cell] of row.entries()) {
			if (cell === ".") continue;
			const N = neighbours(x, y, grid).map(([nX, nY]) => grid[nY][nX]);
			if (N.filter(n => n !== ".").length < 4) {
				count++;
			} else {
				newGrid[y][x] = '@';
			}
		}
	}

	grid = newGrid;
	return count;
};

const part1 = countRemovable();
let part2 = part1;
do {
	const count = countRemovable();
	if (count === 0) break;
	part2 += count;
} while (true);

console.log('Part 1:', part1);
console.log('Part 2:', part2);