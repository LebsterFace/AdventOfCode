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

const power = ({ red, green, blue }: Hand) => red * green * blue;

console.log(data
	.map(([id, game]) => fewestCubes(game))
	.map(power)
	.reduce((a, b) => a + b));