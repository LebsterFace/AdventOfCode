import { readFileSync } from "node:fs";

const cardWinCounts = new Map(readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(line => {
		const [cardNumber, numbers] = line.split(": ");
		const [winning, has] = numbers.split(" | ").map(x => x.split(/\s+/g).map(Number));
		const id = parseInt(cardNumber.slice("Card ".length));
		const winCount = winning.filter(n => has.includes(n)).length;
		return [id, winCount];
	}));

const queue = [...cardWinCounts.keys()];
let totalCards = 0;
while (queue.length > 0) {
	const id = queue.shift()!;
	const winCount = cardWinCounts.get(id)!;
	totalCards++;

	for (let i = 1; i <= winCount; i++) {
		queue.unshift(id + i);
	}

}

console.log(totalCards);