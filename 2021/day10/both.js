process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(/\r?\n/g);

const PAIRS = {
	"(": ")",
	"[": "]",
	"{": "}",
	"<": ">"
};

const isOpen = c => c in PAIRS;
const isCorrect = (a, b) => b === PAIRS[a];

const SYNTAX_POINTS = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const AUTOCOMPLETE_POINTS = { ")": 1, "]": 2, "}": 3, ">": 4 };

let syntaxScore = 0;
const scores = input.map(line => {
	const stack = [];

	for (const character of line) {
		if (isOpen(character)) {
			stack.push(character);
		} else {
			if (!isCorrect(stack.pop(), character)) {
				syntaxScore += SYNTAX_POINTS[character];
				return null; // Line is corrupted
			}
		}
	}

	if (stack.length === 0) {
		return null; // Everything is closed, line is complete
	}

	// The line is incomplete
	let score = 0;

	for (let i = stack.length - 1; i >= 0; i--) {
		const character = PAIRS[stack[i]];
		score = (score * 5) + AUTOCOMPLETE_POINTS[character];
	}

	return score;
}).filter(score => score !== null);

console.log("One:", syntaxScore);
scores.sort((a, b) => a - b);
console.log("Two:", scores[Math.floor(scores.length / 2)]);