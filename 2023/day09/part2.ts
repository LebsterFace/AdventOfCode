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
		const lastDifference = data.pop()!.at(0)!;
		const nextDifferences = data.at(-1)!;
		nextDifferences.unshift(nextDifferences.at(0)! - lastDifference);
	}
	
	sum += data.at(-1)!.at(0)!;
}

console.log(sum);