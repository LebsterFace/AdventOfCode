process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(",")
	.map(Number);

const alignTo = n => {
	let result = 0;
	for (const horizontalPosition of input) {
		result += Math.abs(horizontalPosition - n);
	}

	return result;
};

const min = Math.min(...input);
const max = Math.max(...input);
let lowest = Infinity;

for (let i = min; i <= max; i++) {
	const result = alignTo(i);
	if (result < lowest) {
		lowest = result;
	}
}

console.log(lowest);
