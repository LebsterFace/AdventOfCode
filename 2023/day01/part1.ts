import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n");

const calibration_values = lines.map(line => {
	const digits = line.replaceAll(/\D/g, "");
	return digits.at(0)! + digits.at(-1)!;
}).map(Number);

console.log(calibration_values.reduce((a, b) => a + b));