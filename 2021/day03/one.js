process.chdir(__dirname);

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n");

// Positive = More 1s than 0s
// Negative = More 0s than 1s
// Zero = Same number of 1s and 0s
const counts = Array.from({ length: 12 }, () => 0);
for (const number of input) {
	for (let i = 0; i < number.length; i++) {
		if (number[i] === "1") {
			counts[i]++;
		} else {
			counts[i]--;
		}
	}
}

// Positive = 1
// Negative = 0
const gamma = parseInt(counts.map(v => v > 0 ? 1 : 0).join(""), 2);
const epsilon = parseInt(counts.map(v => v < 0 ? 1 : 0).join(""), 2);

console.log(gamma * epsilon);