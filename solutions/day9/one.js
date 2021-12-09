process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(line => [...line].map(Number));

let sum = 0;
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		const neighbours = [];
		if (y > 0) neighbours.push(input[y - 1][x]);
		if (y < input.length - 1) neighbours.push(input[y + 1][x]);
		if (x > 0) neighbours.push(input[y][x - 1]);
		if (x < input[y].length - 1) neighbours.push(input[y][x + 1]);
		const cell = input[y][x];
		const isLessThan = neighbours.every(n => cell < n);
		if (isLessThan) {
			const riskLevel = cell + 1;
			sum += riskLevel;
		}
	}
}

console.log(sum);