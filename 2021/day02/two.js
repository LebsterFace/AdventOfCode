process.chdir(__dirname);

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(v => v.split(" "));

let y = 0,
	x = 0,
	aim = 0;

for (const [keyword, number] of input) {
	let n = parseInt(number);
	if (keyword == "up") aim -= n;
	if (keyword == "down") aim += n;

	if (keyword == "forward") {
		x += n;
		y += aim * n;
	}
}

console.log(x * y);