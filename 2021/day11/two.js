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

const allFlashed = () => {
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			if (!input[y][x].flashed) {
				return false;
			}
		}
	}

	return true;
};

const step = () => {
	// Reset every cell
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			input[y][x].value += 1;
			input[y][x].flashed = false;
		}
	}

	// Initialise the queue to all cells which flash immediately
	const queue = input.flat().filter(cell => cell.value > 9);
	if (queue.length === 0) return false; // Fastpath

	// Until the queue is empty
	while (queue.length > 0) {
		const cell = queue.shift(); // Take the first item out of the queue
		if (cell.flashed) continue; // If the cell has already flashed, it cannot do so again

		cell.flashed = true;
		// Reset the value
		cell.value = 0;

		// Get all unflashed neighbours
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

		// Increment every neighbour
		for (const n of neighbours)
			n.value += 1;

		// Add all neighbours who are now flashing to the queue
		for (const n of neighbours) {
			if (n.value > 9) {
				queue.push(n);
			}
		}
	}

	return allFlashed();
};

let i = 1;
while (!step()) i += 1;
console.log(i);