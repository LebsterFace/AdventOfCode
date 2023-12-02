process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(line => {
		const [patterns, output] = line.split(" | ");
		return {
			patterns: patterns.split(" "),
			output: output.split(" ")
		};
	});

// 1, 4, 7, and 8 each use a unique number of segments
const unique = new Set([2, 4, 3, 7]);

let result = 0;
for (const { output } of input) result += output.reduce((sum, v) => sum + unique.has(v.length), 0);
console.log(result);