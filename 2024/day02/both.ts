import { differences, input, int } from "../utils.js";
const { abs, sign } = Math;

const isSafe = (report: number[]) => differences(report).every((change, _, dif) =>
	abs(change) >= 1 && abs(change) <= 3
	&& sign(change) === sign(dif[0])
);

const reports = input().split("\n").map(line => line.split(" ").map(int));
console.log('Part 1:', reports.filter(isSafe).length);
console.log('Part 2:', reports.filter(report => report.some((_, i) => isSafe(report.toSpliced(i, 1)))).length);