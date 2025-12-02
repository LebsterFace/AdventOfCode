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

const guard = { x: -1, y: -1, direction: Direction.Up };
const obstacles = new Set<`${number},${number}`>();
for (const [y, row] of mapString.entries()) {
	for (const [x, cell] of row.entries()) {
		if (cell === "#") {
			obstacles.add(`${x},${y}`);
		} else if (cell === "^") {
			guard.x = x;
			guard.y = y;
		}
	}
}

const guardPositions: typeof obstacles = new Set();
while (guard.x < x_max && guard.y < y_max) {
	guardPositions.add(`${guard.x},${guard.y}`);

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

console.log(guardPositions.size);