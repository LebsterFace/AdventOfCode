import { input, int } from "../../utils.js";

const lines = input().split("\n").map(l => l.split(": ").flatMap(x => x.split(" ")).map(int));

const concat = (a: number, b: number) => 10 ** Math.floor(Math.log10(b) + 1) * a + b;

const compute = (values_: number[], operators: string, target: number) => {
	const values = [...values_];
	let total = values.shift()!;
	for (const op of operators) {
		if (total > target) return total;
		if (op === "0") total += values.shift()!;
		if (op === "1") total *= values.shift()!;
		if (op === "2") total = concat(total, values.shift()!);
	}

	return total;
};

let sum = 0;
for (const [target, ...values] of lines) {
	for (let i = 0; i < 3 ** (values.length - 1); i++) {
		const operators = i.toString(3)
			.padStart(values.length - 1, '0');

		if (compute(values, operators, target) === target) {
			sum += target;
			break;
		}
	}
}

console.log(sum);