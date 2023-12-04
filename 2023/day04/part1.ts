import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(line => line.split(": ")[1].split(" | ").map(x => x.split(/\s+/g).map(Number)));

let total = 0;
for (const [winning, has] of input) {
	let points = 0.5;
	for (const number of winning) {
		if (has.includes(number))
			points *= 2;
	}

	total += Math.floor(points);
}

console.log(total);