import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "");

type MappingData = {
	destStart: number;
	sourceStart: number;
	length: number;
};

const mappingApplies = (d: MappingData, input: number) => {
	if (d === undefined) debugger;
	const start = d.sourceStart;
	const end = d.sourceStart + d.length - 1;
	return input >= start && input <= end;
};

const applyMappingData = (d: MappingData | undefined, input: number) => {
	if (d !== undefined && mappingApplies(d, input)) {
		const difference = d.sourceStart - d.destStart;
		return input - difference;
	}

	return input;
};


const chunkify = <T>(arr: T[], size: number): T[][] => {
	const result = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}

	return result;
};

const seeds = chunkify(input.split("\n")[0].slice("seeds: ".length).split(" ").map(Number), 2) as [number, number][];
const maps = [...input.matchAll(/(.+?)-to-(.+?) map:((?:\n\d+ \d+ \d+)+)/g)].map(([, , , data]) =>
	data.trim().split("\n").map((row): MappingData => {
		const [, destStart, sourceStart, length] = row.match(/^(\d+) (\d+) (\d+)$/)!.map(Number);
		return { destStart, sourceStart, length };
	}));

let lowestLocation = Infinity;

for (const [start, length] of seeds) {
	for (let seedNumber = start; seedNumber < start + length; seedNumber++) {
		let current = seedNumber;
		for (const map of maps) {
			const relevantMapping = map.find(m => mappingApplies(m, current));
			const newValue = applyMappingData(relevantMapping, current);
			current = newValue;
		}

		if (current < lowestLocation) {
			lowestLocation = current;
		}
	}
}

console.log(lowestLocation);