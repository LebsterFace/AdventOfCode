import { readFileSync } from "node:fs";

const [times, bestDistances] = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => l.split(":")[1].trim().split(/\s+/g).map(Number));

let result = 1;
for (let i = 0; i < times.length; i++) {
	const time = times[i];
	const bestDistance = bestDistances[i];

	let wins = 0;
	for (let buttonTime = 1; buttonTime < time; buttonTime++) {
		const distance = (time - buttonTime) * buttonTime;
		if (distance > bestDistance) {
			wins++;
		}
	}

	result *= wins;
}

console.log(result);