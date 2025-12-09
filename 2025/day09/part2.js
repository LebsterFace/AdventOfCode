import { input, int, TwoDimensionalMap } from "../../utils.js";

const red_tiles = input()
	.split("\n")
	.map(t => t.split(",").map(int));

const verticalEdges = [];
const horizontalEdges = [];
const tiles = new TwoDimensionalMap();

let last = red_tiles.at(-1);
for (const current of red_tiles) {
	const [x1, y1] = current;
	const [x2, y2] = last;

	// Go from current ---> last
	if (x1 < x2) {
		for (let x = x1; x <= x2; x++) tiles.set(x, y1, true);
		horizontalEdges.push([current, last]);
	} else if (x1 > x2) {
		for (let x = x2; x <= x1; x++) tiles.set(x, y1, true);
		horizontalEdges.push([last, current]);
	} else if (y1 < y2) {
		for (let y = y1; y <= y2; y++) tiles.set(x1, y, true);
		verticalEdges.push([current, last]);
	} else {
		for (let y = y2; y <= y1; y++) tiles.set(x1, y, true);
		verticalEdges.push([last, current]);
	}

	last = current;
}

const insidePolygon = (x, y) => {
	if (tiles.has(x, y)) {
		return true;
	}

	let edges = 0;
	for (const [[x1, y1], [, y2]] of verticalEdges) {
		if (x1 > x && y >= y1 && y < y2) {
			edges++;
		}
	}

	return edges % 2 === 1;
};

const hVIntersection = ([[h1x, hy], [h2x]], [[vx, v1y], [, v2y]]) => (
	Math.min(h1x, h2x) < vx && vx < Math.max(h1x, h2x) &&
	Math.min(v1y, v2y) < hy && hy < Math.max(v1y, v2y)
);

const invalid = (a, b, c, d) => {
	if (!insidePolygon(a, b)) return true;
	if (!insidePolygon(c, b)) return true;
	if (!insidePolygon(a, d)) return true;
	if (!insidePolygon(c, d)) return true;

	for (const horizontal of horizontalEdges) {
		if (hVIntersection(horizontal, [[a, b], [a, d]])) return true;
		if (hVIntersection(horizontal, [[c, b], [c, d]])) return true;
	}

	for (const vertical of verticalEdges) {
		if (hVIntersection([[a, b], [c, b]], vertical)) return true;
		if (hVIntersection([[a, d], [c, d]], vertical)) return true;
	}

	return false;
};

let max = -Infinity;
for (const [a, b] of red_tiles) {
	for (const [c, d] of red_tiles) {
		if (invalid(a, b, c, d)) continue;
		const width = Math.abs(a - c) + 1;
		const height = Math.abs(b - d) + 1;
		const area = width * height;
		if (area > max) {
			max = area;
		}
	}
}

console.log(max);