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
	while (result.at(-1)!.some(x => x !== 0)) {
		result.push(differences(result.at(-1)!));
	}

	return result;
};

let sum = 0;
for (const history of input) {
	const data = allDifferences(history);
	while (data.length > 1) {
		const lastDifference = data.pop()!.at(-1)!;
		const nextDifferences = data.at(-1)!;
		nextDifferences.push(nextDifferences.at(-1)! + lastDifference);
	}
	
	sum += data.at(-1)!.at(-1)!;
}

console.log(sum);