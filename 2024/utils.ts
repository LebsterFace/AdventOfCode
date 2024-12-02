import { readFileSync } from "fs";

export const input = () => readFileSync("./input.txt", "utf-8").trim().replaceAll("\r", "");

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