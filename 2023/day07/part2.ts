import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => {
		const [hand, bid] = l.split(" ");
		return { hand: [...hand] as Hand, bid: parseInt(bid) };
	});

const CARDS = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"] as const;
type Card = typeof CARDS[number];
type Hand = Card[];

const HAND_TYPES = ["HIGH_CARD", "ONE_PAIR", "TWO_PAIR", "THREE_OF_A_KIND", "FULL_HOUSE", "FOUR_OF_A_KIND", "FIVE_OF_A_KIND"] as const;
type HandType = typeof HAND_TYPES[number];

const countCards = (hand: Hand): number[][] => {
	const counts = new Map<Card, number>();
	for (const card of hand) {
		const count = counts.get(card) ?? 0;
		counts.set(card, count + 1);
	}

	const jokerCount = counts.get("J") ?? 0;
	if (jokerCount === 5) return [[5]];
	counts.delete("J");

	const result: number[][] = [];
	for (const [existingCard, count] of counts) {
		const copy = new Map(counts);
		copy.set(existingCard, count + jokerCount);
		result.push([...copy.values()].sort((a, b) => b - a));
	}

	return result;
};

const concreteHandType = (counts: number[]): HandType => {
	// Five of a kind, where all five cards have the same label: AAAAA
	if (counts[0] === 5) return "FIVE_OF_A_KIND";
	// Four of a kind, where four cards have the same label and one card has a different label: AA8AA
	if (counts[0] === 4) return "FOUR_OF_A_KIND";
	// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
	if (counts[0] === 3 && counts[1] === 2) return "FULL_HOUSE";
	// Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
	if (counts[0] === 3 && counts[1] === 1 && counts[2] === 1) return "THREE_OF_A_KIND";
	// Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
	if (counts[0] === 2 && counts[1] === 2 && counts[2] === 1) return "TWO_PAIR";
	// One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
	if (counts[0] === 2 && counts[1] === 1 && counts[2] === 1 && counts[3] === 1) return "ONE_PAIR";
	// High card, where all cards' labels are distinct: 23456
	return "HIGH_CARD";
};

const handType = (hand: Hand): HandType => {
	const possibleCounts = countCards(hand);
	const possibleHandTypes = possibleCounts.map(concreteHandType);
	possibleHandTypes.sort((a, b) => HAND_TYPES.indexOf(b) - HAND_TYPES.indexOf(a));
	return possibleHandTypes[0];
};

const compareHands = (a: Hand, b: Hand): number => {
	// return 1 if a > b
	// return -1 if b > a
	// else return 0
	for (let i = 0; i < a.length; i++) {
		const aCard = CARDS.indexOf(a[i]);
		const bCard = CARDS.indexOf(b[i]);
		if (aCard > bCard) return 1;
		if (bCard > aCard) return -1;
	}

	return 0;
};

const groups = new Map<HandType, typeof input>();
for (const data of input) {
	const type = handType(data.hand);
	if (!groups.has(type)) groups.set(type, []);
	groups.get(type)!.push(data);
}

const entries = [...groups]
	.sort(([a], [b]) => HAND_TYPES.indexOf(a) - HAND_TYPES.indexOf(b))
	.map(([t, data]) => data.sort((a, b) => compareHands(a.hand, b.hand)))
	.flat();

const winnings = entries.map((x, i) => x.bid * (i + 1));
console.log(winnings.reduce((a, b) => a + b));
