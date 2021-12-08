process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n")
	.map(line => {
		const [patterns, output] = line.split(" | ");
		return {
			patterns: patterns.split(" "),
			output: output.split(" ")
		};
	});

const CORRECT_MAPPINGS = {
	"0": "abcefg",
	"1": "cf",
	"2": "acdeg",
	"3": "acdfg",
	"4": "bcdf",
	"5": "abdfg",
	"6": "abdfeg",
	"7": "acf",
	"8": "abcdefg",
	"9": "abcdfg"
};


const equals = (a, b) => {
	if (a.length !== b.length) return false;

	const set = new Set([...b]);
	for (const letter of a) {
		if (!set.has(letter)) {
			return false;
		}
	}

	return true;
};

const unique = (a, ...rest) => {
	const set = new Set([...rest.join("")]);

	let result = "";
	for (const signal of a) {
		if (!set.has(signal)) result += signal;
	}

	return result;
};

let sum = 0;
for (const { output, patterns } of input) {
	/** @type {{[digit: string]: string}} */
	const known = {};
	/** @type {{[digit: string]: string[]}} */
	const unknown = { zero: [], two: [], three: [], five: [], six: [], nine: [] };

	for (const pattern of patterns) {
		switch (pattern.length) {
			case 2:
				known.one = pattern;
				break;
			case 3:
				known.seven = pattern;
				break;
			case 4:
				known.four = pattern;
				break;
			case 5:
				unknown.two.push(pattern);
				unknown.three.push(pattern);
				unknown.five.push(pattern);
				break;
			case 6:
				unknown.zero.push(pattern);
				unknown.six.push(pattern);
				unknown.nine.push(pattern);
				break;
			case 7:
				known.eight = pattern;
				break;
		}
	}

	const real = {};
	known.nine = unknown.nine.find(p => unique(known.four, p).length === 0);

	real.a = unique(known.seven, known.one);
	real.g = unique(known.nine, known.four, real.a);
	real.e = unique(known.eight, known.four, real.a, real.g);


	known.zero = unknown.zero.find(p => unique(p, known.one, Object.values(real)).length === 1);
	real.b = unique(known.zero, known.one, Object.values(real));
	real.d = unique(known.eight, known.zero);

	known.six = unknown.six.find(p => p !== known.nine && p !== known.zero);

	real.f = unique(known.six, Object.values(real));
	real.c = unique(known.eight, Object.values(real));

	const decoded = output.map(src => {
		for (const [key, value] of Object.entries(real)) {
			src = src.replace(value, key.toUpperCase());
		}

		src = src.toLowerCase();
		return Object.entries(CORRECT_MAPPINGS)
			.find(([digit, encoding]) => equals(encoding, src))[0];
	});

	sum += parseInt(decoded.join(""));
}

console.log(sum);