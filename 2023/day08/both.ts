import { readFileSync } from "node:fs";

const [instructions, map] = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n\n");

type MapNode = { name: string; left: MapNode; right: MapNode; steps: number; };

// @ts-ignore
const nodes: MapNode[] = map.split("\n").map(line => {
	const [name, pair] = line.split(" = ");
	const [left, right] = pair.slice(1, -1).split(", ");
	return { name, left, right, steps: -1 };
});

for (const node of nodes) {
	node.left = nodes.find(n => n.name === node.left as unknown as string)!;
	node.right = nodes.find(n => n.name === node.right as unknown as string)!;
}

let index = 0;
let current = nodes.filter(n => n.name.endsWith("A"));
while (current.some(n => n.steps === -1)) {
	const instruction = instructions[index++ % instructions.length];
	current = current.map(node => {
		if (node.steps === -1) {
			if (instruction === "L") node = node.left;
			if (instruction === "R") node = node.right;
			if (node.name.endsWith("Z")) node.steps = index;			
			if (node.name === "ZZZ") console.log('Part 1:', index);
		}

		return node;
	});
}

const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
const lcm = (a: number, b: number) => a * b / gcd(a, b);

console.log('Part 2:', current.map(n => n.steps).reduce(lcm));