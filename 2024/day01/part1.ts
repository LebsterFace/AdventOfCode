import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8").trim().replaceAll("\r", "").split("\n");
const left = lines.map(x => parseInt(x.split("   ")[0], 10)).toSorted((a, b) => a - b);
const right = lines.map(x => parseInt(x.split("   ")[1], 10)).toSorted((a, b) => a - b);

let sum = 0;
for (let i = 0; i < left.length; i++) {
	const difference = Math.abs(left[i] - right[i]);
	sum += difference;
}

console.log(sum);