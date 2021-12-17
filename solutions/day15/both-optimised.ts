type Vertex = {
	x: number;
	y: number;
	cost: number;
	distance: number;
};

interface PriorityQueue {
	add(value: Vertex): void;
	update(value: Vertex): void;
	pop(): Vertex;
	isEmpty(): boolean;
}

class NaivePriorityQueue implements PriorityQueue {
	private verticies: Vertex[] = [];

	isEmpty(): boolean {
		return this.verticies.length === 0;
	}

	addToBottom(value: Vertex): void {
		this.verticies.push(value);
	}

	add(value: Vertex): void {
		let i = 0;
		for (; i < this.verticies.length; i++) {
			if (this.verticies[i].distance > value.distance) {
				break;
			}
		}

		this.verticies.splice(i, 0, value);
	}

	remove(value: Vertex): void {
		const index = this.verticies.indexOf(value);
		if (index !== -1) this.verticies.splice(index, 1);
	}

	update(value: Vertex): void {
		this.remove(value);
		this.add(value);
	}

	pop(): Vertex {
		return this.verticies.shift() as Vertex;
	}
}

// @ts-ignore
process.chdir(__dirname);
// @ts-ignore
const readFileSync = (fileName: string): string => require("fs")
	.readFileSync(fileName, "utf-8")
	.trim();

const getPartOneInput = (): Vertex[][] =>
	readFileSync("./input.txt")
		.split("\n")
		.map((line, y) => line.split("").map((cost, x) => ({
			x, y,
			cost: Number(cost),
			distance: Infinity
		})));

const expandMap = (input: Vertex[][]): Vertex[][] => {
	const width = input[0].length;
	const height = input.length;

	const result: Vertex[][] = Array.from({ length: width * 5 }, () => Array.from({ length: height * 5 }, () => (null as unknown) as Vertex));

	// Expand the map to the true 5x5 size
	for (let expandX = 0; expandX < 5; expandX++) {
		for (let expandY = 0; expandY < 5; expandY++) {
			const costIncrease = expandX + expandY;

			const offsetX = width * expandX;
			const offsetY = height * expandY;

			for (let y = 0; y < input.length; y++) {
				for (let x = 0; x < input[y].length; x++) {
					const cost = input[y][x].cost + costIncrease;

					result[y + offsetY][x + offsetX] = {
						cost: cost > 9 ? cost - 9 : cost,
						x: x + offsetX,
						y: y + offsetY,
						distance: Infinity
					};
				}
			}
		}
	}

	return result;
};

// @ts-ignore
const getNow = () => performance.now();

const BAR_WIDTH = 80;
const solve = (input: Vertex[][], max: number) => {
	const width = input[0].length;
	const height = input.length;
	const end = input[height - 1][width - 1];
	const start = input[0][0];
	start.distance = 0;

	const pq = new NaivePriorityQueue();
	for (const row of input)
		for (const node of row)
			pq.addToBottom(node);

	const START = getNow();
	let iter = 0;
	while (!pq.isEmpty()) {
		//#region Logging
		const fraction = ++iter / max;
		const filled_length = Math.floor(fraction * BAR_WIDTH);
		const bar = "=".repeat(Math.max(0, filled_length)) + "-".repeat(Math.max(0, BAR_WIDTH - filled_length));
		const seconds_remaining = (max - iter) / ((iter / (getNow() - START)) * 1000);
		// @ts-ignore
		process.stdout.write(`\r${iter.toLocaleString()}/250,000\t(${(fraction * 100).toFixed(2)}%) [${bar}] ${seconds_remaining.toFixed(0)}s remaining\x1B[0K`);
		//#endregion

		const current = pq.pop();
		const neighbours = [
			input[current.y - 1]?.[current.x],
			input[current.y + 1]?.[current.x],
			input[current.y]?.[current.x - 1],
			input[current.y]?.[current.x + 1],
		].filter(t => typeof t !== "undefined");

		for (const node of neighbours) {
			const newDistance = current.distance + node.cost;

			if (newDistance < node.distance) {
				node.distance = newDistance;
				pq.update(node);
			}
		}
	}

	const runtime = getNow() - START;

	return { result: end.distance, runtime };
};

const partOne = solve(getPartOneInput(), 10_000);
const partTwo = solve(expandMap(getPartOneInput()), 250_000);

// @ts-ignore
process.stdout.write("\x1B[2K\r");
console.log("Part One:", partOne.result);
console.log("Part Two:", partTwo.result);
console.log();
console.log(`Part One finished in ${(partOne.runtime / 1000).toFixed(2)} seconds`);
console.log(`Part Two finished in ${(partTwo.runtime / 1000).toFixed(2)} seconds`);