type Regular = {
	value: number;
	left: number;
	right: number;
};

type SnailfishNumber = Regular[];

const parse = (str: string): SnailfishNumber => {
	const result: SnailfishNumber = [];
	let left = 0,
		right = 0;

	for (const character of str) {
		switch (character) {
			case "[":
				left++;
				break;
			case ",":
				left--;
				right++;
				break;
			case "]":
				right--;
				break;
			default:
				result.push({ value: parseInt(character), left, right });
		}
	}

	return result;
};



/** Explodes a snailfish number, returns a boolean representing if it was able to */
const explode = (number: SnailfishNumber): boolean => {
	const indexOfRightNumber = number.findIndex((current, j) => {
		if (j === 0) return false;

		const last = number[j - 1];
		const lastDepth = last.left + last.right;
		const currentDepth = current.left + current.right;

		return (
			lastDepth === currentDepth &&		// They are both the same depth
			currentDepth > 4 &&					// They are both nested more than four
			current.right === last.right + 1	// Current is the rightmost one of the pair
		);
	});

	if (indexOfRightNumber === -1)
		return false;

	const firstLeft = number[indexOfRightNumber - 2];
	const a = number[indexOfRightNumber - 1];
	const b = number[indexOfRightNumber];
	const firstRight = number[indexOfRightNumber + 1];

	if (firstLeft) firstLeft.value += a.value;
	if (firstRight) firstRight.value += b.value;

	number.splice(indexOfRightNumber - 1, 2, { value: 0, left: b.left, right: a.right });
	return true;
};

/** Split a snailfish number, returns a boolean representing if it was able to */
const split = (number: SnailfishNumber): boolean => {
	const indexOfRegularToSplit = number.findIndex(r => r.value >= 10);
	if (indexOfRegularToSplit === -1) return false;

	const { value, left, right } = number[indexOfRegularToSplit];
	number.splice(indexOfRegularToSplit, 1,
		{ value: Math.floor(value / 2), left: left + 1, right: right },
		{ value: Math.ceil(value / 2), left: left, right: right + 1 }
	);

	return true;
};

const add = (a: SnailfishNumber, b: SnailfishNumber): SnailfishNumber => {
	const result = [
		...a.map(r => ({ ...r, left: r.left + 1 })),
		...b.map(r => ({ ...r, right: r.right + 1 }))
	];

	while (explode(result) || split(result));

	return result;
};

const getMagnitude = (n: SnailfishNumber): number =>
	n.reduce((sum, { left, right, value }) => sum + (3 ** left * 2 ** right * value), 0);

const getPossiblePermutations = (numbers: SnailfishNumber[]) => {
	const result: { a: SnailfishNumber, b: SnailfishNumber; }[] = [];
	for (const a of numbers) {
		for (const b of numbers) {
			if (a !== b)
				result.push({ a, b });
		}
	}

	return result;
};

import { readFileSync } from "fs";
process.chdir(__dirname);
const numbers = readFileSync("./input.txt", "utf-8")
	.trim()
	.split(/\r?\n/g)
	.map(parse);

const sum = numbers.reduce(add);
const mag = getMagnitude(sum);

console.log("One:", mag);

const perm = getPossiblePermutations(numbers);
const best = Math.max(...perm.map(({ a, b }) => getMagnitude(add(a, b))));

console.log("Two:", best);