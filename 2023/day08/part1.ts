import { readFileSync } from "node:fs";

const [instructions, map] = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n\n");

const nodes = map.split("\n").map(line => {
	const [name, pair] = line.split(" = ");
	const [left, right] = pair.slice(1, -1).split(", ");
	return { name, left, right };
});

let steps = 0;
let currentName = "AAA";
let index = 0;
while (currentName !== "ZZZ") {
	const instruction = instructions[index];

	const node = nodes.find(n => n.name === currentName)!;
	if (instruction === "L") currentName = node.left;
	if (instruction === "R") currentName = node.right;

	index += 1;
	if (index >= instructions.length) index = 0;
	steps++;
}

console.log(steps);