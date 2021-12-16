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
}

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

const max = 10_000;
let result = true;
const RUNTIMES = Array.from({ length: 50 }, () => 50);

let step = 0;

while (result) {
	const begin = performance.now();
	const averageRuntime = RUNTIMES.reduce((sum, current) => sum + current, 0) / RUNTIMES.length;
	step++;
	
	const stepsPerMS = 1 / averageRuntime;
	const fraction = step / max;
	const stepsRemaining = max - step;
	const msRemaining = stepsRemaining / stepsPerMS;

	const date = new Date(Date.now() + msRemaining);
	const hh = date.getHours().toString().padStart(2, "0");
	const mm = date.getMinutes().toString().padStart(2, "0");
	const ss = date.getSeconds().toString().padStart(2, "0");

	const barWidth = 100;
	const charactersFull = Math.round(fraction * barWidth);
	const charactersEmpty = barWidth - charactersFull;
	const bar = "=".repeat(Math.max(0, charactersFull)) + "-".repeat(Math.max(0, charactersEmpty));

	process.stdout.write("\033[0;0f" + [
		`${step}/10,000 (${(fraction * 100).toFixed(3)}%)`,
		`${(stepsPerMS * 1000).toFixed(2)} per s.`,
		`${(msRemaining / 1000).toFixed(0)}s remain`,
		`Done ${hh}:${mm}:${ss}${"\033"}[K`,
	].join("\t"));
	process.stdout.write("\n[" + bar + "]");

	result = updateEstimates();
	RUNTIMES.pop();
	RUNTIMES.unshift(performance.now() - begin);
}

console.clear();
console.log("\n" + end.estimate);