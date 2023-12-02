process.chdir(__dirname);

let [initialString, rawRules] = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\n\n");

const rules = rawRules
	.split(/\r?\n/g)
	.map(rule => {
		const [ab, c] = rule.split(" -> ");
		const a = ab.charAt(0);
		const b = ab.charAt(1);

		return {
			c,
			ab,
			ac: a + c,
			cb: c + b
		};
	});

const add = (obj, key, amount = 1) => {
	if (key in obj) {
		obj[key] += amount;
	} else {
		obj[key] = amount;
	}
};

const initialPairs = {};
for (let i = 0; i < initialString.length - 1; i++) {
	const pair = initialString.slice(i, i + 2);
	add(initialPairs, pair);
}

const counts = {};
for (const char of initialString) {
	add(counts, char);
}

const step = (pairs, log = false) => {
	const nextPairs = Object.fromEntries(Object.entries(pairs));

	for (const rule of rules) {
		const { ab, c, ac, cb } = rule;
		if (ab in pairs && pairs[ab] > 0) {
			// Remove ab pair
			nextPairs[ab] -= pairs[ab];

			// add pairs
			add(nextPairs, ac, pairs[ab]);
			add(nextPairs, cb, pairs[ab]);

			// add count
			add(counts, c, pairs[ab]);
		}
	}

	return nextPairs;
};

const getAnswer = () => {
	const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
	const leastCommon = sorted[0][1];
	const mostCommon = sorted[sorted.length - 1][1];
	return mostCommon - leastCommon;
};

let pairs = initialPairs;
for (let i = 0; i < 40; i++)
	pairs = step(pairs);

console.log(getAnswer());