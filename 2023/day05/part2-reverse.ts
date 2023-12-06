import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "");

type MappingData = {
	destStart: number;
	sourceStart: number;
	length: number;
};

const mappingOutputs = (d: MappingData, output: number) => {
	if (d === undefined) debugger;
	const start = d.destStart;
	const end = d.destStart + d.length - 1;
	return output >= start && output <= end;
};

const reverseApplyMappingData = (d: MappingData | undefined, output: number) => {
	if (d !== undefined && mappingOutputs(d, output)) {
		const difference = d.destStart - d.sourceStart;
		return output - difference;
	}

	return output;
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

maps.reverse();

let location = 0;
while (true) {
	let current = location;
	for (const map of maps) {
		const relevantMapping = map.find(m => mappingOutputs(m, current));
		const newValue = reverseApplyMappingData(relevantMapping, current);
		current = newValue;
	}

	for (const [start, length] of seeds) {
		if (current >= start && current <= start + length + 1) {
			console.log(location);
			process.exit(0);
		}
	}

	location++;
}