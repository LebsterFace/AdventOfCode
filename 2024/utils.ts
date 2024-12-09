import { readFileSync } from "fs";

export const input = (filename = "./input.txt") => readFileSync(filename, "utf-8").trim().replaceAll("\r", "");

export const differences = (array: number[]): number[] => {
	const result: number[] = [];
	for (let i = 1; i < array.length; i++) {
		result.push(array[i] - array[i - 1]);
	}

	return result;
};

export function unzip<T>(array: [T, T][]): [T[], T[]];
export function unzip<T>(array: T[][]): T[][] {
	const result: T[][] = [];
	for (const subarray of array) {
		for (const [index, element] of subarray.entries()) {
			if (index in result) {
				result[index].push(element);
			} else {
				result[index] = [element];
			}
		}
	}

	return result;
}

export function zip<T>(array1: T[], array2: T[]): [T[], T[]];
export function zip<T>(...arrays: T[][]): T[][] {
	if (arrays.length === 0) throw new Error("No arrays to zip");

	const result: T[][] = Array.from(arrays[0], () => []);
	for (const array of arrays) {
		for (const [index, element] of array.entries()) {
			if (!(index in result)) throw new Error(`Array length mismatch (index ${index})`);
			result[index].push(element);
		}
	}

	return result;
}

export const int = (str: string) => parseInt(str.trim(), 10);
type CompareFn<T> = Parameters<Array<T>["sort"]>[0];
export const ascending: CompareFn<number> = (a, b) => b - a;
export const descending: CompareFn<number> = (a, b) => a - b;

export const count = <T>(array: T[], value: T): number => {
	let result = 0;
	for (const element of array)
		if (element === value)
			result++;

	return result;
};

export const swap = <T extends unknown[]>(array: T, index1: number, index2: number) => {
	const temp = array[index2];
	array[index2] = array[index1];
	array[index1] = temp;
};

export const buildMap = <K, V>(pairs: [K, V][]): Map<K, V[]> => {
	const result = new Map<K, V[]>();
	for (const [k, v] of pairs) {
		const existing = result.get(k);
		if (existing) {
			existing.push(v);
		} else {
			result.set(k, [v]);
		}
	}

	return result;
};

export const buildUniqueMap = <K, V>(pairs: [K, V][]): Map<K, V> => {
	const result = new Map<K, V>();
	for (const [k, v] of pairs) {
		if (result.has(k)) {
			throw new Error("Duplicate key in unique map");
		} else {
			result.set(k, v);
		}
	}

	return result;
};

export const comparePosition = <T>(array: T[], a: T, b: T) => {
	const aIndex = array.indexOf(a);
	if (aIndex === -1) return 0;
	const bIndex = array.indexOf(b);
	if (bIndex === -1) return 0;
	return aIndex - bIndex;
};

export const findInGrid = <T>(grid: T[][], value: T): Array<readonly [number, number]> => grid.flatMap((row, y) =>
	row.map((cell, x) => [cell, x] as const)
		.filter(([cell, x]) => cell === value)
		.map(([cell, x]) => [x, y] as const)
);

export const pairs = <T>(array: T[]): T[][] => array.flatMap((first, firstIndex) => array.toSpliced(0, firstIndex + 1).map(second => [first, second]));

export const chunkify = <T>(arr: T[], size: number): T[][] => {
	const result = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}

	return result;
};