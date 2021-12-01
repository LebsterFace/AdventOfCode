const fs = require("fs");
process.chdir(__dirname);
const input = fs.readFileSync("./input.txt", "utf-8")
	.split(/\n/g)
	.map(str => parseInt(str));

let last = input[0];
let increaseCount = 0;

for (let i = 1; i < input.length; i++) {
	if (input[i] > last) {
		// It increased
		increaseCount += 1;
	}

	last = input[i];
}

console.log(increaseCount);