import { input, int } from "../utils.js";

const isSafe = (report: number[]) => report.every((value, i) => {
	if (i === 0) return true;
	const change = value - report[i - 1];
	return Math.abs(change) >= 1 && Math.abs(change) <= 3 &&
		   Math.sign(change) === Math.sign(report[1] - report[0]);
});

const reports = input().split("\n").map(line => line.split(" ").map(int));
console.log('Part 1:', reports.filter(isSafe).length);
console.log('Part 2:', reports.filter(report => report.some((_, i) => isSafe(report.toSpliced(i, 1)))).length);