process.chdir(__dirname);

const { increaseCount } = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(Number)
	.reduce(({ last, increaseCount }, current) => ({
		last: current,
		increaseCount: increaseCount + (current > last ? 1 : 0)
	}), {
		last: Infinity, // The first one should not be counted
		increaseCount: 0
	});

console.log(increaseCount);