import { input, int } from "../../utils.js";

const problems = input().split("\n").map(l => l.trim().split(/\s+/g));
const transpose = Array.from(problems[0], (_, i) => problems.map(r => r[i]));
let total = 0;
for (const problem of transpose) {
	const numbers = problem.slice(0, -1).map(int);
	const operation = problem.at(-1);
	if (operation === "+") {
		total += numbers.reduce((a, b) => a + b);
	} else {
		total += numbers.reduce((a, b) => a * b);
	}
}

console.log(total);