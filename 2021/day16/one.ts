import Parser from "./common";
import * as fs from "fs";
process.chdir(__dirname);

const parser = new Parser(fs.readFileSync("./input.txt", "utf-8"));
console.log(parser.getVersionSum());