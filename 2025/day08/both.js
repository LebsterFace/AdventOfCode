import { input, int, BinaryHeap } from "../../utils.js";

const distance = ([x1, y1, z1], [x2, y2, z2]) => Math.hypot(x1 - x2, y1 - y2, z1 - z2);

const boxes = input()
	.split("\n")
	.map(P => P.split(",").map(int));

const distances = new BinaryHeap(([a, b], [c, d]) => distance(boxes[a], boxes[b]) - distance(boxes[c], boxes[d]));

for (let i = 0; i < boxes.length; i++) {
	for (let j = i + 1; j < boxes.length; j++) {
		distances.push([i, j]);
	}
}

const circuits = boxes.map((b, i) => [i]);

let a, b;
const connect = () => {
	const [start, end] = distances.pop();

	const startIndex = circuits.findIndex(X => X.includes(start));
	const endIndex = circuits.findIndex(X => X.includes(end));

	const startCircuit = circuits[startIndex];
	const endCircuit = circuits[endIndex];

	if (!startCircuit.includes(end)) {
		a = start;
		b = end;
		startCircuit.push(...endCircuit);
		circuits.splice(endIndex, 1);
	}
};

for (let n = 0; n < 1000; n++) {
	connect();
}

const [A, B, C] = circuits.map(C => C.length).sort((a, b) => b - a);
console.log("Part 1:", A * B * C);

while (circuits.length !== 1) {
	connect();
}

console.log("Part 2:", boxes[a][0] * boxes[b][0]);