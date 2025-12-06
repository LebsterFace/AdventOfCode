import { input, int } from "../../utils.js";

const [ranges_input, ingredients_input] = input().split("\n\n");
const ranges = ranges_input.split("\n").map(r => r.split("-").map(int));
const ingredients = ingredients_input.split("\n").map(int);

let count = 0;
for (const i of ingredients) {
	let fresh = false;
	for (const [L, U] of ranges) {
		if (i >= L && i <= U) {
			fresh = true;
		}
	}

	if (fresh) {
		count++;
	}
}

console.log(count);