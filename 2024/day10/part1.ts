import { bounds, cardinalNeighbours, findInGrid, input, int } from "../utils.js";

const map = input().split("\n").map(x => x.split("").map(x => x === '.' ? -1 : int(x)));

const reachableNines = (start_x: number, start_y: number) => {
	const found = new Set<`${number},${number}`>();
	const searchPoints = [[start_x, start_y]];
	while (searchPoints.length > 0) {
		const [pX, pY] = searchPoints.shift()!;
		const value = map[pY][pX];
		if (value === 9) {
			found.add(`${pX},${pY}`);
			continue;
		}

		const neighbours = cardinalNeighbours(pX, pY, map);
		searchPoints.push(...neighbours.filter(([x, y]) => map[y][x] === value + 1));
	}

	return found;
};

const trailheads = findInGrid(map, 0);
let sum = 0;
for (const [x, y] of trailheads) {
	sum += reachableNines(x, y).size;
}

console.log(sum);