import { input, int } from "../../utils.js";

const lines = input().split("\n").map(l => l.split(": ").flatMap(x => x.split(" ")).map(int));

const concat = (a: number, b: number) => 10 ** Math.floor(Math.log10(b) + 1) * a + b;
const compute = (operators: number, op_count: number, values: number[], target: number, base: 2 | 3) => {
	let total = values[0];
	for (let i = 0; i < op_count; i++) {
		if (total > target) break;
		const rem = operators % base;
		if (rem === 0) total += values[i + 1];
		else if (rem === 1) total *= values[i + 1];
		else if (rem === 2) total = concat(total, values[i + 1]);
		operators = Math.floor(operators / base);
	}

	return total;
};

const solve = (base: 2 | 3) => {
	let sum = 0;
	for (const [target, ...values] of lines) {
		const op_count = values.length - 1;
		const max_operators = base ** op_count;
		for (let operators = 0; operators < max_operators; operators++) {
			if (compute(operators, op_count, values, target, base) === target) {
				sum += target;
				break;
			}
		}
	}

	return sum;
};

console.log('Part 1:', solve(2));
console.log('Part 2:', solve(3));