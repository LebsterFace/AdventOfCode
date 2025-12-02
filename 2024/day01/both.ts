import { readFileSync } from "node:fs";
import { ascending, count, int, unzip, zip } from "../../utils.js";

const lines = readFileSync("./input.txt", "utf-8").trim().replaceAll("\r", "").split("\n");
const [left, right] = unzip(lines.map(x => x.split("   ").map(int) as [number, number]));

let part_one = 0, part_two = 0;
for (const [L, R] of zip(left.toSorted(ascending), right.toSorted(ascending))) {
	part_one += Math.abs(R - L);
	part_two += L * count(right, L);
}

console.log('Part 1:', part_one);
console.log('Part 2:', part_two);