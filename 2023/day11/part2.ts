import { readFileSync } from "node:fs";

type Cell = {
	yShift: number;
	xShift: number;
	x: number;
	y: number;
	isGalaxy: boolean;
};

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").flatMap((row, y) => [...row].map((cell, x): Cell => ({
		x, y, isGalaxy: cell === '#',
		xShift: 0, yShift: 0
	})));

const rows = new Map<number, Cell[]>();
const columns = new Map<number, Cell[]>();
for (const cell of input) {
	if (!rows.has(cell.y)) rows.set(cell.y, []);
	if (!columns.has(cell.x)) columns.set(cell.x, []);
	rows.get(cell.y)!.push(cell);
	columns.get(cell.x)!.push(cell);
}

const emptyRows = [...rows].filter(([y, row]) => row.every(c => !c.isGalaxy)).map(d => d[0]);
const emptyColumns = [...columns].filter(([x, column]) => column.every(c => !c.isGalaxy)).map(d => d[0]);

for (const row of emptyRows) {
	const cellsAfterRow = input.filter(c => c.y > row);
	for (const c of cellsAfterRow) {
		c.yShift++;
	}
}

for (const column of emptyColumns) {
	const cellsAfterColumn = input.filter(c => c.x > column);
	for (const c of cellsAfterColumn) {
		c.xShift++;
	}
}

const SCALE = 1e6 - 1;
for (const cell of input) {
	cell.x += cell.xShift * SCALE;
	cell.y += cell.yShift * SCALE;
}

const galaxies = input.filter(cell => cell.isGalaxy);

const pairings: [Cell, Cell][] = [];
for (let first = 0; first < galaxies.length; first++) {
	for (let second = first + 1; second < galaxies.length; second++) {
		const start = galaxies[first];
		const end = galaxies[second];
		pairings.push([start, end]);
	}
}

let sum = 0;
for (const [{ x: x1, y: y1 }, { x: x2, y: y2 }] of pairings) {
	sum += Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

console.log(sum);