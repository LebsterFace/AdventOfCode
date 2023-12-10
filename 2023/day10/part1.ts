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
const tileset: Record<string, [Direction, Direction]> = {
	"|": ["north", "south"],
	"-": ["east", "west"],
	"L": ["north", "east"],
	"J": ["north", "west"],
	"7": ["south", "west"],
	"F": ["south", "east"],
};

const opposites: Record<Direction, Direction> = {
	"north": "south",
	"south": "north",
	"east": "west",
	"west": "east"
};

const connectedNeighbours = ({ x, y }: Point) => {
	const cell = input[y][x];
	const cellDirection = tileset[cell];

	const neighbours: Record<Direction, Point> = {
		north: { x, y: y - 1 },
		south: { x, y: y + 1 },
		east: { x: x + 1, y },
		west: { x: x - 1, y }
	};

	const result: (Point & { connection: Direction; })[] = [];
	for (const [neighbourDirection, { x, y }] of Object.entries(neighbours) as [Direction, Point][]) {
		if (
			tileset[input[y]?.[x]]?.includes(opposites[neighbourDirection]) &&
			(cell === "S" || cellDirection.includes(neighbourDirection))
		) {
			result.push({ x, y, connection: neighbourDirection });
		}
	}

	if (result.length !== 2) {
		throw new Error("Cell is connected to more than 2 cells");
	}

	return result;
};

const start = findStart();
const startDirections = connectedNeighbours(start).map(c => c.connection);
const startCell = Object.entries(tileset)
	.find(([k, v]) => v.includes(startDirections[0]) && v.includes(startDirections[1]))![0];
input[start.y][start.x] = startCell;

type PointString = `${number},${number}`;
const pointToString = ({ x, y }: Point): PointString => `${x},${y}`;

const loop = new Set<PointString>();
const queue = [[start]];
let steps = -1;
while (queue.length > 0) {
	steps++;
	const next = queue.shift()!;
	let discoveredNodes: Point[] = [];

	for (const node of next) {
		loop.add(pointToString(node));
		discoveredNodes.push(...connectedNeighbours(node));
	}

	discoveredNodes = discoveredNodes.filter(s => !loop.has(pointToString(s)));

	if (discoveredNodes.length > 0)
		queue.push(discoveredNodes);
}

console.log(steps);