import { readFileSync } from "node:fs";

type Hand = { red: number; green: number; blue: number; };
type GameData = Hand[];

const parseGameData = (data: string): GameData => {
	const hands = data.split("; ");
	return hands.map(hand => {
		const list = hand.split(", ")
			.map(c => c.split(" ") as [string, string])
			.map(([count, color]) => [parseInt(count), color] as const);

		return {
			red: list.find(([, color]) => color === "red")?.[0] ?? 0,
			green: list.find(([, color]) => color === "green")?.[0] ?? 0,
			blue: list.find(([, color]) => color === "blue")?.[0] ?? 0
		} as Hand;
	});
};

const data = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n")
	.map(l => {
		const [, id, data] = l.match(/Game (\d+): (.+)/)!;
		return [
			parseInt(id),
			parseGameData(data)
		] as const;
	});

const fewestCubes = (game: GameData): Hand => {
	let result: Hand = { red: 0, green: 0, blue: 0 };
	for (const hand of game) {
		result.red = Math.max(result.red, hand.red);
		result.green = Math.max(result.green, hand.green);
		result.blue = Math.max(result.blue, hand.blue);
	}

	return result;
};

const ALLOWED_RED = 12;
const ALLOWED_GREEN = 13;
const ALLOWED_BLUE = 14;

const isPossible = (game: GameData): boolean => {
	for (const hand of game) {
		if (hand.red > ALLOWED_RED) return false;
		if (hand.green > ALLOWED_GREEN) return false;
		if (hand.blue > ALLOWED_BLUE) return false;
	}

	return true;
};

const possibleGames = data.filter(([id, data]) => isPossible(data));
console.log('Part 1:', possibleGames.map(([id]) => id).reduce((a, b) => a + b));

const power = ({ red, green, blue }: Hand) => red * green * blue;

console.log('Part 2:', data
	.map(([id, game]) => fewestCubes(game))
	.map(power)
	.reduce((a, b) => a + b));