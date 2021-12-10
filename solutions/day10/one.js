process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(/\r?\n/g);

const isOpen = c => c === "(" || c === "[" || c === "{" || c === "<";
const isClose = c => c === ")" || c === "]" || c === "}" || c === ">";
const isCorrect = (a, b) =>
	(a === "(" && b === ")") ||
	(a === "[" && b === "]") ||
	(a === "{" && b === "}") ||
	(a === "<" && b === ">");

const SCORE = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

let total = 0;
for (const line of input) {
	const stack = [];
	currentLine: for (const character of line) {
		if (isOpen(character)) {
			stack.push(character);
		} else if (isClose(character)) {
			const open = stack.pop();
			if (!isCorrect(open, character)) {
				total += SCORE[character];
				break currentLine;
			}
		}
	}
}

console.log(total);
