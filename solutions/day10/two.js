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
const isCorrect = (a, b) => isOpen(a) && b === PAIRS[a];

const POINTS = { ")": 1, "]": 2, "}": 3, ">": 4 };

const scores = input.map(line => {
	const stack = [];
	for (const character of line) {
		if (isOpen(character)) {
			stack.push(character);
		} else {
			if (!isCorrect(stack.pop(), character))
				return null; // Corrupted
		}
	}

	if (stack.length === 0) return null; // Complete
	let score = 0;

	for (let i = stack.length - 1; i >= 0; i--) {
		const character = PAIRS[stack[i]];
		score = (score * 5) + POINTS[character];
	}

	return score;
}).filter(score => score !== null);

scores.sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)]);