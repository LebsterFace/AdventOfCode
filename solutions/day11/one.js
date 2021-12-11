process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(/\r?\n/g)
	.map((line, y) => [...line].map((value, x) => ({
		value: Number(value),
		x, y,
		flashed: false
	})));

const step = () => {
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			input[y][x].value += 1;
			input[y][x].flashed = false;
		}
	}

	const queue = input.flat().filter(cell => cell.value > 9);

	let flashes = 0;
	while (queue.length > 0) {
		const cell = queue.shift();
		if (cell.flashed) {
			continue;
		}

		cell.flashed = true;
		flashes += 1;
		cell.value = 0;

		const neighbours = [
			input[cell.y - 1]?.[cell.x - 1],
			input[cell.y - 1]?.[cell.x],
			input[cell.y - 1]?.[cell.x + 1],
			input[cell.y]?.[cell.x - 1],
			input[cell.y]?.[cell.x + 1],
			input[cell.y + 1]?.[cell.x - 1],
			input[cell.y + 1]?.[cell.x],
			input[cell.y + 1]?.[cell.x + 1],
		].filter(t => typeof t !== "undefined").filter(n => !n.flashed);

		for (const n of neighbours)
			n.value += 1;

		for (const n of neighbours) {
			if (n.value > 9) {
				queue.push(n);
			}
		}
	}

	return flashes;
};

let sum = 0;
for (let i = 0; i < 100; i++) sum += step();
console.log(sum);