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

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/

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

const KNOWN_MAPPINGS = {
	"0": "abcefg",
	"1": "cf",
	"4": "bcdf",
	"6": "abdfeg",
	"7": "acf",
	"8": "abcdefg",
	"9": "abcdfg"
};

const UNKNOWN_MAPPINGS = {
	"2": "acdeg",
	"3": "acdfg",
	"5": "abdfg",
};



const LENGTHS = { "0": 6, "1": 2, "2": 5, "3": 5, "4": 4, "5": 5, "6": 6, "7": 3, "8": 7, "9": 6 };
const getDigitsWithLength = n => Object.entries(LENGTHS).filter(([k, v]) => v === n).map(([k, v]) => k);

const relationships = {};
for (const [a_digit, a_mapping] of Object.entries(CORRECT_MAPPINGS)) {
	const result = {};

	for (const [b_digit, b_mapping] of Object.entries(CORRECT_MAPPINGS)) {
		const set = new Set([...a_mapping]);

		let same = 0;
		let different = 0;
		for (const char of b_mapping) {
			if (set.has(char)) same++;
			else different++;
		}

		// for finding
		// if (!(a_digit in UNKNOWN_MAPPINGS) && a_digit !== "8" && b_digit in UNKNOWN_MAPPINGS && (different === 2 || same === 0)) {
		// console.log({a: a_digit, b: b_digit, same, different});
		// }

		result[b_digit] = { a: a_digit, b: b_digit, same, different };
	};

	relationships[a_digit] = result;
}

/** @param {string[]} patterns */
const stageOne = (patterns) => {
	const known = {};
	/** @type {{[digit: string]: string[]}} */
	const unknown = {};

	for (const pattern of patterns) {
		const possibles = getDigitsWithLength(pattern.length);

		if (possibles.length === 1) {
			const number = possibles[0];
			known[number] = pattern;
		} else {
			for (const possible of possibles) {
				if (possible in unknown) {
					unknown[possible].push(pattern);
				} else {
					unknown[possible] = [pattern];
				}
			}
		}
	}

	return {
		known: {
			one: known["1"],
			four: known["4"],
			seven: known["7"],
			eight: known["8"],
		},
		unknown
	};
};

const unique = (a, b) => {
	const set = new Set([...b]);
	const results = [];

	for (const signal of a) {
		if (!set.has(signal)) {
			results.push(signal);
		}
	}

	return results.length === 1 ? results[0] : new Set(results);
};

/**
 * @param {ReturnType<stageOne>["unknown"]} unknown
 * @param {string} sequence
 */
const nowKnown = (unknown, sequence) => {
	const revealed = [];
	for (const key in unknown) {
		const newValue = unknown[key].filter(s => s !== sequence);
		if (newValue.length === 1) revealed.push([key, newValue[0]]);
		if (newValue.length < 2) delete unknown[key];
		else unknown[key] = newValue;
	}

	return revealed;
};

const stageTwo = ({ known, unknown }) => {
	const real = {};

	real.a = unique(known.seven, known.one);

	// if u have all same signals as 4, ur 9
	const fourSignals = [...known.four];
	known.nine = unknown["9"].find(possible => {
		const signals = new Set([...possible]);
		return fourSignals.every(s => signals.has(s));
	});

	delete unknown["9"];
	nowKnown(unknown, known.nine);

	const fourRegex = new RegExp("[" + known.four + "]", "g");
	real.g = known.nine			// the signal of 9		--> abcdfg
		.replace(fourRegex, "") // which is not in 4	--> ag     (-bcdf)
		.replace(real.a, "");	// which is not a		--> g

	real.e = known.eight	     // the signal of 8		--> abcdefg
		.replace(fourRegex, "")	 // which is not in 4	--> aeg     (-bcdf)
		.replace(real.a, "")	 // which is not a 		--> eg
		.replace(real.g, "");	 // which is not g		--> e

	// abcefg
	// A cEfG
	// the signal of 1		--> cf
	// with +AEG			--> A cEfG
	// missing 1 is 0
	const test = new RegExp("[" + known.one + real.a + real.e + real.g + "]", "g");

	known.zero = unknown["0"].find(t => t.replace(test, "").length === 1);
	delete unknown["0"];
	const revealed = nowKnown(unknown, known.zero);

	known.six = revealed[0][1];
	delete unknown["6"];
	nowKnown(unknown, known.six);

	// the signal of 8		--> abcdefg
	// which is not in 0	--> d      (-abcefg)
	real.d = unique(known.eight, known.zero);

	// the signal of 4 		--> bcdf
	// which is not in 1	--> bd
	// which is not d		--> b

	/** @type {Set<"a" | "b" | "c" | "d" | "e" | "f" | "g">} */
	const bd = unique(known.four, known.one);
	bd.delete(real.d);
	real.b = [...bd.values()][0];

	// the signal of 6		--> abdfeg
	// which is not known	--> f
	const knownRegex = new RegExp(Object.values(real).join("|"), "g");
	real.f = known.six.replace(knownRegex, "");

	//				  abcdefg
	// I know signals ab defg
	// only signal missing is c
	real.c = "abcdefg".replace(knownRegex, "").replace(real.f, "");

	return src => {
		for (const [key, value] of Object.entries(real)) {
			src = src.replace(value, key.toUpperCase());
		}

		src = src.toLowerCase();
		return Object.entries(CORRECT_MAPPINGS).find(([k, v]) => equals(v, src))[0];
	};
};

let sum = 0;
for (const { output, patterns } of input) {
	const decode = stageTwo(stageOne(patterns));
	const decoded = output.map(decode).join("");
	sum += parseInt(decoded);
}

console.log(sum);