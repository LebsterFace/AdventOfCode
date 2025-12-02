import { input, int, chunkify } from "../../utils.js";
const ranges = input().split(",").map(r => r.split("-").map(int));

let part1 = 0;
let part2 = 0;

for (const [first, last] of ranges) {
	ids: for (let id = first; id <= last; id++) {
		const str = id.toString();
		for (let length = 1; length < str.length; length++) {
			const chunks = chunkify(str, length);

			if (chunks.every(c => c === chunks[0])) {
				if (chunks.length === 2) {
					part1 += id;
				}

				part2 += id;
				continue ids;
			}
		}
	}
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);