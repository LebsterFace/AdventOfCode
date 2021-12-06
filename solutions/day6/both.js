process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(",");

const counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for (const fish of input) counters[fish]++;

const iteration = () => {
	const newfish = counters.shift();
	counters.push(newfish);
	counters[6] += newfish;
};

for (let i = 0; i < 80; i++) iteration();
console.log("One:", counters.reduce((a, b) => a + b, 0));
for (let i = 80; i < 256; i++) iteration();
console.log("Two:", counters.reduce((a, b) => a + b, 0));
