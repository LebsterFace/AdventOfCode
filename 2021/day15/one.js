const { performance } = require("perf_hooks");

process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(/\r?\n/g)
	.map((line, y) => [...line].map((digit, x) => ({
		cost: Number(digit),
		x, y, explored: false,
		estimate: Infinity
	})));

const allTiles = input.flat(Infinity);

const next = () => {
	const unexplored = allTiles.filter(n => !n.explored);
	if (unexplored.length === 0) return null;
	return unexplored.reduce((best, current) => current.estimate < best.estimate ? current : best);
};

const getConnected = ({ x, y }) => [
	input[y - 1]?.[x],
	input[y]?.[x - 1],
	input[y]?.[x + 1],
	input[y + 1]?.[x],
].filter(Boolean);

const start = allTiles[0];
const end = allTiles.at(-1);
start.estimate = 0;

const updateEstimates = () => {
	const current = next();
	if (current === null) return false;
	current.explored = true;

	const connected = getConnected(current);
	for (const node of connected) {
		// estimate of a + cost of b = estimate of b
		const estimate = current.estimate + node.cost;

		if (estimate < node.estimate)
			node.estimate = estimate;
	}

	return true;
};

let result = true;
while (result)
	result = updateEstimates();
console.log(end.estimate);