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

const test = (x_velocity: number, y_velocity: number): [boolean, number] => {
	let state = { x: 0, y: 0, x_velocity, y_velocity };
	let highestY = 0;

	while (state.x <= xMax && state.y >= yMin) {
		if (state.x >= xMin && state.x <= xMax && state.y >= yMin && state.y <= yMax)
			return [true, highestY];

		state = step(state);
		if (state.y > highestY)
			highestY = state.y;
	}

	return [false, highestY];
};

let highestHighest = { x: -1, y: -1, height: -Infinity };
const bound = xMin;
for (let y = 0; y < bound; y++) {
	for (let x = 0; x < bound; x++) {
		const [works, height] = test(x, y);
		if (works && height > highestHighest.height) {
			highestHighest = { x, y, height };
		}
	}
}

console.log(highestHighest.height);