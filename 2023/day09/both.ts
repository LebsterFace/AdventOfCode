import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => l.split(" ").map(Number));

const differences = (array: number[]): number[] => {
	const result: number[] = [];
	for (let i = 0; i < array.length - 1; i++) {
		const a = array[i], b = array[i + 1];
		result.push(b - a);
	}

	return result;
};

const allDifferences = (array: number[]): number[][] => {
	const result: number[][] = [array];
	while (result[0]!.some(x => x !== 0)) {
		result.unshift(differences(result[0]));
	}

	return result;
};

const result = input.map(history => {
	const data = allDifferences(history);
	while (data.length > 1) {
		const newDifferences = data.shift()!;
		data[0].push(data[0].at(-1)! + newDifferences.at(-1)!);
		data[0].unshift(data[0].at(0)! - newDifferences.at(0)!);
	}

	return data[0];
});

console.log('Part 1:', result.map(x => x.at(-1)!).reduce((a, b) => a + b));
console.log('Part 2:', result.map(x => x[0]).reduce((a, b) => a + b));