import { input, int, swap } from "../../utils.js";

const map = input().split("").map(int);
const disk: number[] = [];

let id = 0;
let isFree = false;
for (const value of map) {
	for (let i = 0; i < value; i++) {
		disk.push(isFree ? -1 : id);
	}

	isFree = !isFree;
	if (isFree) id++;
}

const find_ranges = (value: number): [number, number][] => {
	if (!disk.includes(value)) throw new Error(`Disk does not contain ${value}`);
	const result: [number, number][] = [];

	let i = disk.indexOf(value);
	while (i !== -1) {
		let j = i + 1;
		while (j < disk.length && disk[j] === value) {
			j++;
		}

		result.push([i, j - i]);
		i = disk.indexOf(value, j);
	}

	return result;
};

move_files: while (--id >= 0) {
	const frees = find_ranges(-1);
	const [file_start, file_length] = find_ranges(id)[0]!;

	for (const [free_start, free_length] of frees) {
		if (free_start >= file_start) break;
		if (file_length <= free_length) {
			for (let i = 0; i < file_length; i++) {
				disk[free_start + i] = id;
				disk[file_start + i] = -1;
			}

			continue move_files;
		}
	}
}

let checksum = 0;
for (const [index, block] of disk.entries()) {
	if (block === -1) continue;
	checksum += index * block;
}

console.log(checksum);
