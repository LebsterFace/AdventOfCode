process.chdir(__dirname);

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(v => v.split(" "));

let x = 0,
	y = 0;

for (const [keyword, number] of input) {
	let n = parseInt(number);
	if (keyword == "up") y -= n;
	if (keyword == "forward") x += n;
	if (keyword == "down") y += n;
}

console.log(x * y);