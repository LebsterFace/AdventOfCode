process.chdir(__dirname);

const toObj = str => {
	const [x, y] = str.split(",");
	return {x: Number(x), y: Number(y)};
}

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(line => line.split(" -> ").map(toObj));

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
}

const counts = {};
for (const [{x: x1, y: y1}, {x: x2, y: y2}] of input) {
	// For now, only consider horizontal and vertical lines:
	// lines where either x1 = x2 or y1 = y2.
	if (x1 !== x2 && y1 !== y2) continue;
	
	let points;
	if (x1 === x2) points = between(y1, y2).map(y => x1 + "," + y);
	else points = between(x1, x2).map(x => x + "," + y1);

	for (const p of points) {
		if (p in counts) {
			counts[p] += 1;
		} else {
			counts[p] = 1;
		}
	}
}

const result = Object.entries(counts).filter(([k, v]) => v > 1).length;
console.log(result);
