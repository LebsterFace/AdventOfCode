import { input, int } from "../utils.js";

const [rules_i, updates_i] = input("./input.txt").split("\n\n");
const rules = rules_i.split("\n").map(x => x.split("|").map(int) as [number, number]);
const updates = updates_i.split("\n").map(x => x.split(",").map(int));

let sum = 0;
for (const update of updates) {
	const isCorrect = update.every((page, pageIndex) => {
		for (const [a, other] of rules) {
			if (a !== page) continue;
			const otherIndex = update.indexOf(other);
			if (otherIndex !== -1 && otherIndex < pageIndex)
				return false;
		}

		return true;
	});

	if (isCorrect) {
		const middleIndex = ((update.length + 1) / 2) - 1;
		sum += update[middleIndex];
	}
}

console.log(sum);