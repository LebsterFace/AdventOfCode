process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim();

const parseInput = () => {
	const [points, folds] = input.split("\n\n")
		.map(part => part.split(/\r?\n/));

	return {
		points: points.map(p => {
			const [x, y] = p.split(",");
			return { x: Number(x), y: Number(y) };
		}),
		folds: folds.map(f => {
			f = f.slice("fold along ".length);
			const [axis, coordinate] = f.split("=");
			return { axis, coordinate: Number(coordinate) };
		})
	};
};

const doFold = ({ axis, coordinate }) => {
	for (const point of points) {
		if (point[axis] <= coordinate) continue;
		const diff = point[axis] - coordinate;
		point[axis] = coordinate - diff;
	}
};

const { folds, points } = parseInput();
doFold(folds.shift());
const pointSet = new Set();
for (const { x, y } of points) pointSet.add(x + "," + y);
console.log("One:", pointSet.size);

folds.forEach(doFold);
const WIDTH = points.reduce((max, current) => Math.max(max, current.x), 0);
const HEIGHT = points.reduce((max, current) => Math.max(max, current.y), 0);

const grid = Array.from({ length: HEIGHT + 1 }, () => Array.from({ length: WIDTH + 1 }, () => " "));
for (const { x, y } of points) grid[y][x] = "▄";
console.log("Two:\n" + grid.map(row => row.join(" ")).join("\n"));