import { count, input, int } from "../../utils.js";

const puzzle = input().split("\n").map(x => x.split(""));

const scan = (x: number, y: number, dx: number, dy: number, length: number): string => {
	let x1 = x;
	let y1 = y;
	let result = '';
	while (
		x1 >= 0 && y1 >= 0 &&
		y1 < puzzle.length && x1 < puzzle[y1].length &&
		Math.abs(x1 - x) < length && Math.abs(y1 - y) < length
	) {
		result += puzzle[y1][x1];
		x1 += dx;
		y1 += dy;
	}

	return result;
};

let sum = 0;
for (const [y, row] of puzzle.entries()) {
	for (const [x, cell] of row.entries()) {
		if (cell !== 'A') continue;
		const area = [
			puzzle[y - 1]?.[x - 1] ?? '', /**/ puzzle[y - 1]?.[x + 1] ?? '',
			/* ....................... */ cell /* ...................... */,
			puzzle[y + 1]?.[x - 1] ?? '', /**/ puzzle[y + 1]?.[x + 1] ?? '',
		] as const;

		const left = area[0] + area[2] + area[4];
		const right = area[1] + area[2] + area[3];
		if ((left === "MAS" || left === "SAM") && (right === "MAS" || right === "SAM")) {
			sum++;
		}
	}
}

console.log(sum);