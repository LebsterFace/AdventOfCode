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
doFold(folds[0]);

const pointSet = new Set();
for (const { x, y } of points) pointSet.add(x + "," + y);
console.log(pointSet.size);