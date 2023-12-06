import { readFileSync } from "node:fs";

const [time, bestDistance] = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(v => Number(v.split(":")[1].trim().replaceAll(/\s/g, "")));

let wins = 0;
for (let buttonTime = 1; buttonTime < time; buttonTime++) {
	const distance = (time - buttonTime) * buttonTime;
	if (distance > bestDistance) {
		wins++;
	}
}

console.log(wins);