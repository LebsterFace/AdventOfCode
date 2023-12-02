import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(line => line.split(" ") as ["addx", `${number}`] | ["noop"]);

let X = 1;
let cycle = 0;

const signalStrength = () => X * cycle;

let sum = 0;
const nextCycle = () => {
	cycle += 1;
	if (cycle % 40 === 20) {
		sum += signalStrength();
	}
};

for (const [instruction, argument] of input) {
	if (instruction === "addx") {
		const value = parseInt(argument);
		nextCycle();
		nextCycle();
		X += value;
	} else if (instruction === "noop") {
		nextCycle();
	} else {
		throw new Error(`Unknown instruction ${instruction}`);
	}
}

console.log(sum);