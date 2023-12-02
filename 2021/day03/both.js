process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n");

const length = 12;

const bitInfo = (array, i) => {
	let n = 0;

	for (const number of array) {
		if (number[i] === "1") n++;
		else n--;
	}

	return {
		mostCommon: n < 0 ? "0" : "1",
		leastCommon: n < 0 ? "1" : "0"
	};
};

const filter = predicate => {
	let copy = input.slice(0);

	for (let bitPos = 0; bitPos < length; bitPos++) {
		const counts = bitInfo(copy, bitPos);
		copy = copy.filter(number => predicate(number[bitPos], counts));
		if (copy.length === 1) return copy[0];
	}

	return null;
};

const gamma = Array.from({ length }, (_, i) => bitInfo(input, i).mostCommon).join("");
const epsilon = Array.from({ length }, (_, i) => bitInfo(input, i).leastCommon).join("");
console.log("One:", parseInt(gamma, 2) * parseInt(epsilon, 2));

const oxygen = filter((bit, { mostCommon }) => bit === mostCommon);
const carbon = filter((bit, { leastCommon }) => bit === leastCommon);
console.log("Two:", parseInt(oxygen, 2) * parseInt(carbon, 2));
