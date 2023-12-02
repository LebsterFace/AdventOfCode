process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(line => [...line].map(n => Number(n) < 9));

const floodFill = (x, y) => {
	if (!input[y][x]) return 0;

	input[y][x] = false;
	let size = 1;

	// floodFill marks as visited, returns number of unvisited cells after it
	if (y > 0 && input[y - 1][x])
		size += floodFill(x, y - 1);

	if (x > 0 && input[y][x - 1])
		size += floodFill(x - 1, y);

	if (x < input[y].length - 1 && input[y][x + 1])
		size += floodFill(x + 1, y);

	if (y < input.length - 1 && input[y + 1][x])
		size += floodFill(x, y + 1);


	return size;
};

const basinSizes = input.flatMap((row, y) => row.map((cell, x) => floodFill(x, y)));
const sorted = basinSizes.filter(size => size > 0).sort((a, b) => b - a);
console.log(sorted[0] * sorted[1] * sorted[2]);