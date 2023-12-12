import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => l.split(" "))
	.map(([row, numbers]) => ({ row: [...row], numbers: numbers }));

const getNumbers = (row: string[]) => {
	const result: number[] = [0];
	for (const cell of row) {
		if (cell === ".") {
			result.push(0);
		} else {
			result[result.length - 1]++;
		}
	}

	return result.filter(x => x > 0).join(",");
};

const copyWith = (array: string[], index: number, replacement: string) => {
	const result = [...array];
	result[index] = replacement;
	return result;
};

const possibleReplacements = (row: string[], start = 0): string[][] => {
	const missingIndex = row.indexOf("?", start);
	if (missingIndex === -1) return [row];
	return [
		...possibleReplacements(copyWith(row, missingIndex, "#"), missingIndex + 1),
		...possibleReplacements(copyWith(row, missingIndex, "."), missingIndex + 1),
	];
};

let sum = 0;
for (const line of input) {
	const ways = possibleReplacements(line.row)
		.map(getNumbers)
		.filter(n => n === line.numbers)
		.length;
	console.log(line.row.join(''), line.numbers, ways);
	sum += ways;
}

console.log(sum);