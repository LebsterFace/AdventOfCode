import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8").trim().replaceAll("\r", "").split("\n");
const left = lines.map(x => parseInt(x.split("   ")[0], 10));
const right = lines.map(x => parseInt(x.split("   ")[1], 10));

let score = 0;
for (const number of left) {
	const times = right.filter(x => x === number).length;
	score += number * times;
}

console.log(score);