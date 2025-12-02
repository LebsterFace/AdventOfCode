import { input } from "../../utils.js";

enum Direction { Up = 0, Right, Down, Left };
const getNext = (x: number, y: number, direction: Direction): [number, number] => {
	if (direction === Direction.Up) return [x, y - 1];
	if (direction === Direction.Down) return [x, y + 1];
	if (direction === Direction.Right) return [x + 1, y];
	if (direction === Direction.Left) return [x - 1, y];
	throw new Error(`Invalid direction ${direction}`);
};

const mapString = input().split("\n").map(line => line.split("") as Array<"#" | "." | "^">);
const y_max = mapString.length;
const x_max = mapString[y_max - 1].length;

const initialGuard = { x: -1, y: -1, direction: Direction.Up };
const initialObstacles = new Set<`${number},${number}`>();
for (const [y, row] of mapString.entries()) {
	for (const [x, cell] of row.entries()) {
		if (cell === "#") {
			initialObstacles.add(`${x},${y}`);
		} else if (cell === "^") {
			initialGuard.x = x;
			initialGuard.y = y;
		}
	}
}

let loops = 0;
for (let newY = 0; newY < y_max; newY++) {
	for (let newX = 0; newX < x_max; newX++) {
		const obstacles = new Set(initialObstacles);
		if (obstacles.has(`${newX},${newY}`)) continue;
		obstacles.add(`${newX},${newY}`);

		const guard = { ...initialGuard };
		const guardPositions: Set<`${number},${number},${Direction}`> = new Set();

		while (guard.x < x_max && guard.y < y_max && guard.x >= 0 && guard.y >= 0) {
			if (guardPositions.has(`${guard.x},${guard.y},${guard.direction}`)) {
				loops++;
				break;
			}

			guardPositions.add(`${guard.x},${guard.y},${guard.direction}`);

			// If there is something directly in front of you, turn right 90 degrees.
			const [fX, fY] = getNext(guard.x, guard.y, guard.direction);
			if (obstacles.has(`${fX},${fY}`)) {
				guard.direction = (guard.direction + 1) % 4;
			} else {
				// Otherwise, take a step forward.
				guard.x = fX;
				guard.y = fY;
			}
		}
	}
}

console.log(loops);