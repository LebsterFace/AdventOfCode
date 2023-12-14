import { readFileSync } from "node:fs";

const get = (data: string[], index: number) => {
	let j = index + 1;
	for (let i = index; i >= 0 && j < data.length; i--) {
		if (data[i] === data[j]) {
			j++;
		} else {
			return null;
		}
	}

	return index + 1;
};

const countMirrorSize = (data: string[]) => {
	const potentialMirrors = data
		.map((c, i) => [c, i] as const)
		.filter(([c, i]) => c === data[i + 1]);

	for (const [, mirrorIndex] of potentialMirrors) {
		const result = get(data, mirrorIndex);
		if (result !== null) return result;
	}

	return null;
};

const determineMirror = (pattern: string) => {
	const rows = pattern.split("\n");
	const columns = rows[0].split("").map((_, i) => rows.map(r => r[i]).join(''));
	const rowsMirror = countMirrorSize(rows);
	const columnsMirror = countMirrorSize(columns);
	if (rowsMirror !== null) return rowsMirror * 100;
	if (columnsMirror !== null) return columnsMirror;
	throw new Error("No mirror!");
};

const patterns = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n\n");

console.log(patterns.map(determineMirror).reduce((a, b) => a + b));