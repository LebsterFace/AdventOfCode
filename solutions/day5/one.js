process.chdir(__dirname);

const lineToPoints = line => {
	// line = "x1,y1 -> x2,y2"
	const [a, b] = line.split(" -> ");
	const [x1, y1] = a.split(",");
	const [x2, y2] = b.split(",");

	return {
		x1: parseInt(x1),
		y1: parseInt(y1),
		x2: parseInt(x2),
		y2: parseInt(y2),
	};
};

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n");

const between = (a, b) => {
	if (a === b) return [];

	const result = [];
	if (a < b) {
		for (let i = a; i <= b; i++) {
			result.push(i);
		}
	} else {
		for (let i = b; i <= a; i++) {
			result.push(i);
		}
	}

	return result;
};

const counts = {};
for (const line of input) {
	const { x1, y1, x2, y2 } = lineToPoints(line);

	// Only consider horizontal and vertical lines
	if (x1 !== x2 && y1 !== y2) continue;

	let points;
	if (x1 === x2) {
		points = between(y1, y2).map(y => x1 + "," + y);
	} else {
		points = between(x1, x2).map(x => x + "," + y1);
	}

	for (const p of points) {
		if (p in counts) {
			counts[p] += 1;
		} else {
			counts[p] = 1;
		}
	}
}

console.log(Object.values(counts).filter(v => v > 1).length);