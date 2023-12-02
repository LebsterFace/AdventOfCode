process.chdir(__dirname);

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n");

const LENGTH = 12;

const getCounts = (array) => {
	const counts = Array.from({ length: LENGTH }, () => 0);
	for (const number of array) {
		for (let i = 0; i < number.length; i++) {
			if (number[i] === "1") {
				counts[i]++;
			} else {
				counts[i]--;
			}
		}
	}

	return counts;
};

const filter = predicate => {
	const copy = input.slice(0);

	for (let bitPos = 0; bitPos < LENGTH; bitPos++) {
		const counts = getCounts(copy);

		for (let i = copy.length - 1; i >= 0; i--) {
			if (!predicate(copy[i][bitPos], counts[bitPos])) {
				copy.splice(i, 1);
			}

			if (copy.length === 1) {
				return copy[0];
			}
		}
	}

	return null;
};

const oxygen = filter((bit, count) => {
	if (count === 0) {
		return bit === "1";
	} else {
		return (count > 0 && bit === "1") || (count < 0 && bit === "0");
	}
});

const carbon = filter((bit, count) => {
	if (count === 0) {
		return bit === "0";
	} else {
		return (count > 0 && bit === "0") || (count < 0 && bit === "1");
	}
});

console.log(parseInt(carbon, 2) * parseInt(oxygen, 2));