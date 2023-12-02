//#region Input
process.chdir(__dirname);

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n");

/** @type {number[]} */
const numbers = input.splice(0, 2)[0].split(",").map(Number);
/** @type {number[][][]} */
const boards = input.reduce((acc, line) => {
	if (line.length === 0) {
		acc.push([]);
	} else {
		acc[acc.length - 1].push(line.split(/\s+/).map(Number));
	}

	return acc;
}, [[]]);
//#endregion

const markNumber = n => {
	for (const board of boards) {
		for (const row of board) {
			for (let i = 0; i < row.length; i++) {
				if (row[i] === n) {
					row[i] *= -1; // Marked
				}
			}
		}
	}
};

/** @param {number[][]} board */
const hasWon = board => {
	const row = board.some(row => row.every(column => column < 0));
	if (row) return true;

	for (let column = 0; column < 5; column++) {
		const test = board.every(row => row[column] < 0);
		if (test) return true;
	}

	return false;
};

const winners = function* () {
	let last = null;

	for (const number of numbers) {
		markNumber(number);
		for (let i = boards.length - 1; i >= 0; i--) {
			if (hasWon(boards[i])) {
				if (last !== null) yield last;
				last = { winner: boards[i], number };
				boards.splice(i, 1);
			}
		}
	}

	return last;
};

/** @param {{ winner: number[][]; number: number }} */
const getScore = ({ winner, number }) => {
	const sumOfUnmarked = winner
		.flat()
		.filter(n => n > 0)
		.reduce((sum, current) => sum + current, 0);

	return sumOfUnmarked * number;
};

const game = winners();
let curr = game.next();
console.log("One:", getScore(curr.value));
while (!curr.done) curr = game.next();
console.log("Two:", getScore(curr.value));