import { input, int } from "../utils.js";

const lines = input().split("\n").map(l => l.split(": ").flatMap(x => x.split(" ")).map(int));

const compute = (values_: number[], operators: string) => {
	const values = [...values_];
	let total = values.shift()!;
	for (const op of operators) {
		if (op === "0") total += values.shift()!;
		if (op === "1") total *= values.shift()!;
	}

	return total;
};

let sum = 0;
for (const [target, ...values] of lines) {
	for (let i = 0; i < 2 ** (values.length - 1); i++) {
		const operators = i.toString(2).padStart(values.length - 1, '0');

		if (compute(values, operators) === target) {
			sum += target;
			break;
		}
	}
}

console.log(sum);