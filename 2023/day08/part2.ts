import { readFileSync } from "node:fs";

const [instructions, map] = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n\n");

const nodes = map.split("\n").map(line => {
	const [name, pair] = line.split(" = ");
	const [left, right] = pair.slice(1, -1).split(", ");
	return { name, left, right };
});

let steps = 1;
let currentNames = nodes.map(n => n.name).filter(name => name.endsWith("A"));
const stepsUntilEnd = currentNames.map(n => -1);

let index = 0;
while (stepsUntilEnd.some(s => s === -1)) {
	const instruction = instructions[index];

	currentNames = currentNames.map(currentName => {
		const node = nodes.find(n => n.name === currentName)!;
		if (instruction === "L") return node.left;
		if (instruction === "R") return node.right;
		throw new Error("?");
	});

	for (let i = 0; i < currentNames.length; i++) {
		if (stepsUntilEnd[i] !== -1) continue;
		if (currentNames[i].endsWith("Z")) {
			stepsUntilEnd[i] = steps;
		}
	}

	index += 1;
	if (index >= instructions.length) index = 0;
	steps++;
}

const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
const lcm = (a: number, b: number) => a * b / gcd(a, b);
console.log(stepsUntilEnd.reduce(lcm));