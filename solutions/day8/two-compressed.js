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


const equals = (a, b) => {
	if (a.length !== b.length) return false;

	const lettersB = new Set([...b]);

	for (const letter of a) {
		if (!lettersB.has(letter)) return false;
	}

	return true;
};


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

const unique = (a, b) => {
	const set = new Set([...b]);

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
	const unknown = { "0": [], "2": [], "3": [], "5": [], "6": [], "9": [] };

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
				unknown["2"].push(pattern);
				unknown["3"].push(pattern);
				unknown["5"].push(pattern);
				break;
			case 6:
				unknown["0"].push(pattern);
				unknown["6"].push(pattern);
				unknown["9"].push(pattern);
				break;
			case 7:
				known.eight = pattern;
				break;
		}
	}

	const real = {};

	real.a = unique(known.seven, known.one);

	const fourSignals = [...known.four];
	known.nine = unknown["9"].find(possible => fourSignals.every(s => possible.includes(s)));
	unknown["6"] = unknown["6"].filter(s => s !== known.nine);

	const fourRegex = new RegExp("[" + known.four + "]", "g");
	real.g = known.nine.replace(fourRegex, "").replace(real.a, "");
	real.e = known.eight.replace(fourRegex, "").replace(real.a, "").replace(real.g, "");

	const test = new RegExp("[" + known.one + real.a + real.e + real.g + "]", "g");
	known.zero = unknown["0"].find(t => t.replace(test, "").length === 1);

	known.six = unknown["6"].find(p => p !== known.zero);
	real.d = unique(known.eight, known.zero);
	real.b = unique(known.four, known.one).replace(real.d, "");

	const knownRegex = new RegExp(Object.values(real).join("|"), "g");
	real.f = known.six.replace(knownRegex, "");
	real.c = "abcdefg".replace(knownRegex, "").replace(real.f, "");

	const decoded = output.map(src => {
		for (const [key, value] of Object.entries(real)) src = src.replace(value, key.toUpperCase());
		src = src.toLowerCase();
		return Object.entries(CORRECT_MAPPINGS).find(([k, v]) => equals(v, src))[0];
	})

	sum += parseInt(decoded.join(""));
}

console.log(sum);