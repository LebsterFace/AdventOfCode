import { input, int } from "../../utils.js";

const [ranges_input] = input().split("\n\n");

const overlapping = (a, b, c, d) => a <= d && c <= b;
const contains = (a, b, c, d) => a <= c && b >= d;

const merge = ranges => {
	const merged = new Set();
	for (const r1 of ranges) {
		for (const r2 of ranges) {
			if (r1 === r2) continue;
			const [a, b] = r1.split("-").map(int);
			const [c, d] = r2.split("-").map(int);
			if (overlapping(a, b, c, d)) {
				const L = Math.min(a, b, c, d);
				const U = Math.max(a, b, c, d);
				merged.add(L + "-" + U);
			}
		}
	}

	const unique = new Set(ranges);
	outer: for (const range of ranges) {
		for (const M of merged) {
			if (range === M) continue;
			const [a, b] = M.split("-").map(int);
			const [c, d] = range.split("-").map(int);
			if (contains(a, b, c, d)) {
				unique.delete(range);
				continue outer;
			}
		}
	}

	return new Set([...merged, ...unique]);
};

let ranges = new Set(ranges_input.split("\n"));
let size;
do {
	size = ranges.size;
	ranges = merge(ranges);
} while (size !== ranges.size);

let total = 0;
for (const range of ranges) {
	const [a, b] = range.split("-").map(int);
	total += b - a + 1;
}

console.log(total);