import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(l => {
		const [hand, bid] = l.split(" ");
		return { hand, bid: parseInt(bid) };
	});

const compareHands = (deck: string, a: string, b: string): number => {
	for (let i = 0; i < a.length; i++) {
		const aCard = deck.indexOf(a[i]);
		const bCard = deck.indexOf(b[i]);
		if (aCard > bCard) return 1;
		if (bCard > aCard) return -1;
	}

	return 0;
};

const HAND_TYPES = ["HIGH_CARD", "ONE_PAIR", "TWO_PAIR", "THREE_OF_A_KIND", "FULL_HOUSE", "FOUR_OF_A_KIND", "FIVE_OF_A_KIND"] as const;
type HandType = typeof HAND_TYPES[number];

const countCards = (hand: string) => {
	const counts = new Map<string, number>();
	for (const card of hand) {
		const cardCount = counts.get(card) ?? 0;
		counts.set(card, cardCount + 1);
	}

	return new Map([...counts].sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA));
};

const concreteHandType = (countString: string) => {
	if (countString === "5") return "FIVE_OF_A_KIND";
	if (countString === "41") return "FOUR_OF_A_KIND";
	if (countString === "32") return "FULL_HOUSE";
	if (countString === "311") return "THREE_OF_A_KIND";
	if (countString === "221") return "TWO_PAIR";
	if (countString === "2111") return "ONE_PAIR";
	return "HIGH_CARD";
};

const firstKey = <K, V>(m: Map<K, V>) => m.keys().next().value as K;
const firstValue = <K, V>(m: Map<K, V>) => m.values().next().value as V;

const handType = (hand: string, replaceJokers: boolean): HandType => {
	const counts = countCards(hand);
	if (replaceJokers) {
		const jokerCount = counts.get("J") ?? 0;
		if (jokerCount === 5) return "FIVE_OF_A_KIND";
		// Replace the jokers with the most common other card in the hand
		counts.delete("J");
		counts.set(firstKey(counts), firstValue(counts) + jokerCount);
	}

	const actualCounts = [...counts.values()];
	const countString = actualCounts.join("");
	return concreteHandType(countString);
};

const solve = (deck: string, replaceJokers: boolean): number => {
	// Group input hands by hand type
	const groups = new Map<HandType, typeof input>();
	for (const data of input) {
		const type = handType(data.hand, replaceJokers);
		if (!groups.has(type)) groups.set(type, []);
		groups.get(type)!.push(data);
	}

	// Sort groups by type
	const entries = [...groups]
		.sort(([a], [b]) => HAND_TYPES.indexOf(a) - HAND_TYPES.indexOf(b))
		// And hands within types
		.map(([t, data]) => data.sort((a, b) => compareHands(deck, a.hand, b.hand)))
		.flat();

	const winnings = entries.map((x, i) => x.bid * (i + 1));
	return winnings.reduce((a, b) => a + b);
};

console.log("Part 1:", solve("23456789TJQKA", false));
console.log("Part 2:", solve("J23456789TQKA", true));