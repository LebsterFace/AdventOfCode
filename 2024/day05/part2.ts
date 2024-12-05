import { input, int, swap } from "../utils.js";

const [rules_i, updates_i] = input().split("\n\n");
const rules = rules_i.split("\n").map(x => x.split("|").map(int) as [number, number]);
const updates = updates_i.split("\n").map(x => x.split(",").map(int));

const isCorrect = (update: number[]) => update.every((page, pageIndex) => {
	for (const [a, other] of rules) {
		if (a !== page) continue;
		const otherIndex = update.indexOf(other);
		if (otherIndex !== -1 && otherIndex < pageIndex)
			return false;
	}

	return true;
});

let sum = 0;
for (const update of updates) {
	if (isCorrect(update)) continue;
	while (!isCorrect(update)) {
		for (let page of update) {
			for (const [a, other] of rules) {
				if (a !== page) continue;
				if (update.indexOf(other) !== -1 && update.indexOf(other) < update.indexOf(page)) {
					swap(update, update.indexOf(page), update.indexOf(other))
				}
			}
		}

	}

	const middleIndex = ((update.length + 1) / 2) - 1;
	sum += update[middleIndex];
}

console.log(sum);