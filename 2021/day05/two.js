process.chdir(__dirname);

const lineToPoints = line => {
	// line = "x1,y1 -> x2,y2"
	const [a, b] = line.split(" -> ");
	const [x1, y1] = a.split(",");
	const [x2, y2] = b.split(",");

	return {
		x1: parseInt(x1),
		y1: parseInt(y1),
		x2: parseInt(x2),
		y2: parseInt(y2),
	};
};

const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split("\r\n");


const counts = {};
for (const line of input) {
	const { x1, y1, x2, y2 } = lineToPoints(line);

	const changeX = Math.sign(x2 - x1);
	const changeY = Math.sign(y2 - y1);

	let xi = x1,
		yi = y1;

	while (xi !== x2 + changeX || yi !== y2 + changeY) {
		const p = xi + "," + yi;

		if (p in counts) {
			counts[p] += 1;
		} else {
			counts[p] = 1;
		}

		xi += changeX;
		yi += changeY;
	}
}

console.log(Object.values(counts).filter(v => v > 1).length);