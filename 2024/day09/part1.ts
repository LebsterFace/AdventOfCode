import { input, int, swap } from "../utils.js";

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

let end = disk.findLastIndex(n => n !== -1);
let freeIndex = disk.indexOf(-1);
do {
	swap(disk, end, freeIndex);
	while (disk[end] === -1) end--;

	freeIndex = disk.indexOf(-1);
} while (freeIndex < end);

let checksum = 0;
for (const [index, block] of disk.entries()) {
	if (block === -1) continue;
	checksum += index * block;
}

console.log(checksum);