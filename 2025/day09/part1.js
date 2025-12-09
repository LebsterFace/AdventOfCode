import { input, int } from "../../utils.js";

const red_tiles = input()
	.split("\n")
	.map(t => t.split(",").map(int));

let max = -Infinity;
for (const [a, b] of red_tiles) {
	for (const [c, d] of red_tiles) {
		const width = Math.abs(a - c) + 1;
		const height = Math.abs(b - d) + 1;
		const area = width * height;
		if (area > max) {
			max = area;
		}
	}
}

console.log(max);