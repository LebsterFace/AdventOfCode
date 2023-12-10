import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(line => [...line]);

type Point = { x: number; y: number; };

const findStart = (): Point => {
	for (const [y, row] of input.entries()) {
		for (const [x, cell] of row.entries()) {
			if (cell === "S") {
				return { x, y };
			}
		}
	}

	throw new Error("Missing start");
};

type Direction = "north" | "east" | "south" | "west";
const tileset: Record<string, Direction[]> = {
	"|": ["north", "south"],
	"-": ["east", "west"],
	"L": ["north", "east"],
	"J": ["north", "west"],
	"7": ["south", "west"],
	"F": ["south", "east"],
	"S": ["north", "east", "south", "west"]
};

const opposites: Record<Direction, Direction> = {
	"north": "south",
	"south": "north",
	"east": "west",
	"west": "east"
};

const connectedNeighbours = ({ x, y }: Point) => {
	const cell = input[y][x];

	const neighbours: Array<Point & { direction: Direction; }> = [
		{ x, y: y - 1, direction: "north" },
		{ x, y: y + 1, direction: "south" },
		{ x: x + 1, y, direction: "east" },
		{ x: x - 1, y, direction: "west" }
	];

	return neighbours.filter(({ x, y, direction }) => (
		// if the target itself connects to the cell
		tileset[cell].includes(direction) &&
		// and the cell exists and it connects to the opposite piece for its location in relation to the target
		// (ie if the cell is north of the target and it connects southwards)
		tileset[input[y]?.[x]]?.includes(opposites[direction])
	));
};

const start = findStart();
const startDirections = connectedNeighbours(start).map(c => c.direction);
const startCell = Object.entries(tileset).find(([k, v]) => v.includes(startDirections[0]) && v.includes(startDirections[1]))![0];
input[start.y][start.x] = startCell;

type PointString = `${number},${number}`;
const loop = new Set<PointString>();
const queue = [[start]];
let steps = -1;
while (queue.length > 0) {
	steps++;
	const next = queue.shift()!;
	let discoveredNodes: Point[] = [];

	for (const node of next) {
		loop.add(`${node.x},${node.y}`);
		discoveredNodes.push(...connectedNeighbours(node));
	}

	discoveredNodes = discoveredNodes.filter(s => !loop.has(`${s.x},${s.y}`));

	if (discoveredNodes.length > 0)
		queue.push(discoveredNodes);
}

let enclosedCount = 0;
for (const [y, row] of input.entries()) {
	for (const x of row.keys()) {
		if (loop.has(`${x},${y}`)) {
			continue;
		}

		let crossingNumber = 0;
		for (let cx = x; cx >= 0; cx--) {
			if (loop.has(`${cx},${y}`) && "|JL".includes(input[y][cx])) {
				crossingNumber++;
			}
		}

		if (crossingNumber % 2 === 1)
			enclosedCount++;
	}
}

console.log('Part 1:', steps);
console.log('Part 2:', enclosedCount);