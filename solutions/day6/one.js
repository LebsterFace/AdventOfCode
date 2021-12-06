process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(",")
	.map(Number);

const iteration = () => {
	const length = input.length;
	for (let i = 0; i < length; i++) {
		if (input[i] === 0) {
			input.push(8);
			input[i] = 6;
		} else {
			input[i] -= 1;
		}
	}
};

for (let i = 0; i < 80; i++) iteration();
console.log(input.length);