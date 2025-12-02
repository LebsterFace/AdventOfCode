import { input, int } from "../../utils.js";

const instructions = input().match(/mul\(\d+,\d+\)/g)!;
const products = instructions.map(x => x.match(/\d+/g)!.map(int).reduce((a, b) => a * b))

console.log(products.reduce((a, b) => a + b));