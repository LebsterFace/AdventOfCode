process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(str => parseInt(str));

const sums = [];
for (let i = 0; i < input.length - 2; i++) {
	const a = input[i],
		b = input[i + 1],
		c = input[i + 2];

	sums.push(a + b + c);
}

let last = sums[0];
let increaseCount = 0;

for (let i = 1; i < input.length; i++) {
	if (sums[i] > last) {
		// It increased
		increaseCount += 1;
	}

	last = sums[i];
}

console.log(increaseCount);
