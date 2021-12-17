type ProbeState = {
	x: number;
	y: number;
	x_velocity: number;
	y_velocity: number;
};

const step = ({ x, y, x_velocity, y_velocity }: ProbeState) => ({
	x: x + x_velocity,
	y: y + y_velocity,
	x_velocity: x_velocity - Math.sign(x_velocity),
	y_velocity: y_velocity - 1,
});


import { readFileSync } from "fs";
process.chdir(__dirname);
const input = readFileSync("./input.txt", "utf-8");
const [xMin, xMax, yMin, yMax] = (input.match(/-?\d+/g) as [string, string, string, string]).map(Number);

const test = (x_velocity: number, y_velocity: number): boolean => {
	let state = { x: 0, y: 0, x_velocity, y_velocity };

	while (state.x <= xMax && state.y >= yMin) {
		if (state.x >= xMin && state.x <= xMax && state.y >= yMin && state.y <= yMax)
			return true;

		state = step(state);
	}

	return false;
};

const bound = 240;
let count = 0;
for (let y = -bound; y < bound; y++) {
	for (let x = -bound; x < bound; x++) {
		if (test(x, y)) count++;
	}
}

console.log(count);