process.chdir(__dirname);

const { increaseCount } = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(Number)
	.reduce((result, first, i, input) => {
		if (i >= input.length - 2) return result; // Stop when there aren't enough left to create a new three-measurement sum.

		const { increaseCount, last } = result;
		const current = first + input[i + 1] + input[i + 2];

		return {
			last: current,
			increaseCount: increaseCount + (current > last ? 1 : 0)
		};
	}, {
		last: Infinity, // The first one should not be counted
		increaseCount: 0
	});

console.log(increaseCount);
