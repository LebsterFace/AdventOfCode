import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n");

const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const calibration_values = lines.map(line => {
	const digits: string[] = [];
	for (let i = 0; i < line.length; i++) {
		if (/\d/.test(line.charAt(i))) {
			digits.push(line.charAt(i));
		} else {
			const word = words.find(w => line.startsWith(w, i));
			if (!word) continue;
			digits.push((words.indexOf(word) + 1).toString());
		}
	}

	return digits.at(0)! + digits.at(-1)!;
}).map(Number);

console.log(calibration_values.reduce((a, b) => a + b));