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

const findSmudge = (pattern: string) => {
	const rows = pattern.split("\n");
	for (const index of rows.keys()) {
		if (countDifferences(rows, index) === 1) {
			return (index + 1) * 100;
		}
	}

	const columns = rows[0].split("").map((_, i) => rows.map(r => r[i]).join(''));
	for (const index of columns.keys()) {
		if (countDifferences(columns, index) === 1) {
			return index + 1;
		}
	}

	throw new Error("Missing smudge");
};

const patterns = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n\n");

console.log(patterns.map(findSmudge).reduce((a, b) => a + b));