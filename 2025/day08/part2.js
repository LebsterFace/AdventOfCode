import { input, int } from "../../utils.js";

const distance = ([x1, y1, z1], [x2, y2, z2]) => Math.hypot(x1 - x2, y1 - y2, z1 - z2);

const boxes = input()
	.split("\n")
	.map(P => P.split(",").map(int));

const distances = boxes.flatMap((A, index) => {
	const result = [];
	for (let i = index + 1; i < boxes.length; i++) {
		const B = boxes[i];
		result.push([[A, B], distance(A, B)]);
	}

	return result;
}).sort(([, aDist], [, bDist]) => aDist - bDist)
	.map(([pair]) => pair);

const circuits = boxes.map(b => [b]);

let result;
while (circuits.length !== 1) {
	const [start, end] = distances.shift();

	const startIndex = circuits.findIndex(X => X.includes(start));
	const endIndex = circuits.findIndex(X => X.includes(end));

	const startCircuit = circuits[startIndex];
	const endCircuit = circuits[endIndex];

	if (!startCircuit.includes(end)) {
		result = start[0] * end[0];
		startCircuit.push(...endCircuit);
		circuits.splice(endIndex, 1);
	}
}

console.log(result);