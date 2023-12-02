process.chdir(__dirname);
const parseInput = () => {
	const [initialState, rules] = require("fs")
		.readFileSync("./input.txt", "utf-8")
		.trim()
		.split("\n\n");

	return {
		initialState,
		rules: rules
			.split(/\r?\n/g)
			.map(rule => {
				const [left, insert] = rule.split(" -> ");
				return {
					a: left.charAt(0),
					b: left.charAt(1),
					insert
				};
			})
	};
};

const { initialState, rules } = parseInput();

/** @param {string} state */
const applyRules = state => {
	const insertions = [];

	for (let a = 0, b = 1; b < state.length; a++, b++) {
		const matchingRule = rules.find(r => r.a === state.charAt(a) && r.b === state.charAt(b));

		if (matchingRule)
			insertions.push({
				position: b,
				character: matchingRule.insert
			});
	}

	const result = [];
	let lastEnd = 0;
	for (const { position, character } of insertions) {
		result.push(state.slice(lastEnd, position));
		result.push(character);
		lastEnd = position;
	}

	result.push(state.slice(lastEnd, state.length));

	return result.join("");
};

const countFrequencies = str => {
	const counts = {};

	for (const char of str) {
		if (char in counts) {
			counts[char] += 1;
		} else {
			counts[char] = 1;
		}
	}

	return counts;
};

const getAnswer = () => {
	const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
	const leastCommon = sorted[0][1];
	const mostCommon = sorted[sorted.length - 1][1];
	return mostCommon - leastCommon;
};

let state = initialState;
for (let i = 0; i < 10; i++) state = applyRules(state);
const counts = countFrequencies(state);
console.log(getAnswer());