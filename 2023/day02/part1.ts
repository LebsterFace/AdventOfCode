import { readFileSync } from "node:fs";

const lines = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "");