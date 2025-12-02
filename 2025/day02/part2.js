import fs from "node:fs/promises";
const input = await fs.readFile("./input.txt", "utf-8");
const ranges = input.split(",").map(r => r.split("-").map(Number));

const chunkify = (str, length) => {
	const result = [];
	for (let i = 0; i < str.length; i += length) {
		result.push(str.slice(i, i + length));
	}

	return result;
};

const fake = new Set();
for (const [first, last] of ranges) {
	ids: for (let id = first; id <= last; id++) {
		const str = id.toString();
		for (let length = 1; length < str.length; length++) {
			const chunks = chunkify(str, length);
			if (chunks.every(c => c === chunks[0])) {
				fake.add(id);
				continue ids;
			}
		}
	}
}

console.log([...fake].reduce((a, b) => a + b));