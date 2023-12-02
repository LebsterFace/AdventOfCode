import { readFileSync } from "fs";

const MINIMUM_OVERLAPPING_POINTS = 3;
type Point = { x: number; y: number; };
type Alignment = { offsetX: number; offsetY: number; };

const Rotation = {
	ZERO: 1,
	NINETY: 2,
	ONE_EIGHTY: 3,
	TWO_SEVENTY: 4
};

class Report {
	public xMin: number;
	public xMax: number;
	public yMin: number;
	public yMax: number;

	constructor(public points: Point[]) {
		this.points = points;
		const xCoordinates = this.points.map(({ x }) => x);
		const yCoordinates = this.points.map(({ y }) => y);

		this.yMin = Math.min(...yCoordinates);
		this.xMin = Math.min(...xCoordinates);

		this.yMax = Math.max(...yCoordinates);
		this.xMax = Math.max(...xCoordinates);
	}

	public render(): string {
		const size = 10;

		const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => "."));
		for (const { x, y } of this.points)
			grid[y + Math.floor(size / 2)][x + Math.floor(size / 2)] = "B";

		return grid.map(row => row.join(" ")).join("\n");
	}

	public map(func: (p: Point) => Point) {
		return new Report(this.points.map(p => func(p)));
	}

	public offset({ offsetX, offsetY }: Alignment) {
		return this.map(({ x, y }) => ({ x: x + offsetX, y: y + offsetY }));
	}

	public rotate(rot: number) {
		if (rot === Rotation.ZERO) {
			return this;
		} else if (rot === Rotation.ONE_EIGHTY) {
			return this.map(({ x, y }) => ({ x, y: -y }));
		} else if (rot === Rotation.NINETY) {
			return this.map(({ x, y }) => ({ x: y, y: -x }));
		} else if (rot === Rotation.TWO_SEVENTY) {
			return this.map(({ x, y }) => ({ x: -y, y: x }));
		} else {
			throw new Error("Invalid rotation value " + rot);
		}
	}

	public contains(point: Point) {
		for (const { x, y } of this.points) {
			if (x === point.x && y === point.y)
				return true;
		}

		return false;
	}

	public isAlignedWith(b: Report, alignment: Alignment) {
		const offsetReport = b.offset(alignment);

		let count = 0;
		for (const p of this.points) {
			if (offsetReport.contains(p)) {
				count++;
				if (count === MINIMUM_OVERLAPPING_POINTS)
					return true;
			}
		}

		return false;
	}
}

const parseReports = (source: string): Report[] => {
	const input = source
		.trim()
		.split(/\r?\n/g);

	const reports: Report[] = [];
	let current: Point[] = [];

	for (let i = 1; i < input.length; i++) {
		if (input[i].length === 0) {
			reports.push(new Report(current));
			current = [];
			i++;
			continue;
		}

		const [x, y] = input[i].split(",");
		current.push({ x: parseInt(x), y: parseInt(y) });
	}

	reports.push(new Report(current));
	return reports;
};

const attemptAlign = (a: Report, b_original: Report): Alignment | null => {
	const rotations = Object.values(Rotation);

	for (const rotation of rotations) {
		const b = b_original.rotate(rotation);

		const alignment: Alignment = {
			offsetX: a.xMax - b.xMin,
			offsetY: a.yMax - b.yMin
		};

		while (alignment.offsetY !== a.yMin - b.yMax) {
			while (alignment.offsetX !== a.xMin - b.xMax) {
				if (a.isAlignedWith(b, alignment))
					return alignment; // Correct alignment has been found

				alignment.offsetX--;
			}

			alignment.offsetX = a.xMax - b.xMin;
			alignment.offsetY--;
		}
	}

	return null;
};

const findAligned = (a: Report, unaligned: Report[]): [Alignment, Report] => {
	for (const b of unaligned) {
		const alignment = attemptAlign(a, b);
		if (alignment === null) continue;
		return [alignment, b];
	}

	throw new Error("No aligned report");
};

process.chdir(__dirname);
const reports = parseReports(readFileSync("./example.txt", "utf-8"));
const root = reports.shift()!;
const [alignment, report] = findAligned(root, reports);

console.log(report); // Output: The second report of the example
console.log(alignment); // { offsetX: 5, offsetY: 2 }