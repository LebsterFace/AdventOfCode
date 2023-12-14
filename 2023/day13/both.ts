import { readFileSync } from "node:fs";

const countDifferences = (data: string[], mirror: number) => {
	let differences = 0;
	let a = mirror;
	let b = mirror + 1;
	while (a >= 0 && b < data.length) {
		for (let i = 0; i < data[a].length; i++) {
			if (data[a][i] !== data[b][i]) {
				differences++;
			}
		}

		a--;
		b++;
	}

	return differences;
};

const getMirrorIndex = (data: string[], expectedDifferences: number) => {
	for (let index = 0; index < data.length - 1; index++) {
		if (countDifferences(data, index) === expectedDifferences) {
			return index + 1;
		}
	}

	return null;
};

const summarise = (pattern: string, expectedDifferences: number) => {
	const rows = pattern.split("\n");
	const columns = rows[0].split("").map((_, i) => rows.map(r => r[i]).join(''));
	return getMirrorIndex(columns, expectedDifferences) ??
		   getMirrorIndex(rows, expectedDifferences)! * 100;
};

const patterns = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n\n");

console.log('Part 1:', patterns.map(p => summarise(p, 0)).reduce((a, b) => a + b));
console.log('Part 2:', patterns.map(p => summarise(p, 1)).reduce((a, b) => a + b));