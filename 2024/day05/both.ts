import { buildMap, comparePosition, input, int, swap } from "../../utils.js";

const [ruleLines, updateLines] = input().split("\n\n").map(s => s.split("\n"));
const rules = buildMap(ruleLines.map(x => x.split("|").map(int) as [number, number]));
const updates = updateLines.map(x => x.split(",").map(int));

const isCorrect = (update: number[]) => update.every(page => rules.get(page)!.every(other => comparePosition(update, other, page) >= 0));

let part1 = 0;
let part2 = 0;


for (const update of updates) {
	const middleIndex = ((update.length + 1) / 2) - 1;

	if (isCorrect(update)) {
		part1 += update[middleIndex];
		continue;
	}

	while (!isCorrect(update)) {
		for (const page of update) {
			for (const other of rules.get(page)!) {
				if (comparePosition(update, other, page) === -1) {
					swap(update, update.indexOf(page), update.indexOf(other));
				}
			}
		}
	}

	part2 += update[middleIndex];
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);