import { input, int } from "../../utils.js";

const distance = (AB) => {
	const [A, B] = AB.split("-");
	const [x1, y1, z1] = A.split(",").map(int);
	const [x2, y2, z2] = B.split(",").map(int);
	return Math.hypot(x1 - x2, y1 - y2, z1 - z2);
};

const boxes = input().split("\n");

const pairs = new Set(boxes.flatMap(A => {
	const result = [];
	for (const B of boxes) {
		if (A === B) continue;
		result.push([A, B].sort().join("-"));
	}

	return result;
}));

const distances = Array.from(pairs, (AB) => [AB, distance(AB)])
	.sort(([, a], [, b]) => a - b)
	.map(([AB, dist]) => [AB.split("-"), dist]);

// [start, end][]
const connections = [];

const circuit = (A) => {
	// dfs from A
	const discovered = new Set();
	const stack = [A];
	while (stack.length !== 0) {
		const v = stack.pop();
		if (!discovered.has(v)) {
			discovered.add(v);
			for (const connection of connections.filter(c => c.includes(v))) {
				stack.push(connection.find(x => x !== v));
			}
		}
	}

	return discovered;
};

for (let i = 0; i < 1000; i++) {
	const [[start, end]] = distances.shift();
	if (!circuit(start).has(end)) {
		connections.push([start, end]);
	}
}

const circuits = new Set(boxes.map(A => [...circuit(A)].sort().join("-")));
const sizes = [...circuits].map(c => c.split("-").length).sort((a, b) => b - a);
console.log(sizes.slice(0, 3).reduce((a, b) => a * b));