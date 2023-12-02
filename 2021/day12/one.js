process.chdir(__dirname);
const input = require("fs")
	.readFileSync("./input.txt", "utf-8")
	.trim()
	.split(/\r?\n/g)
	.map(line => {
		const [from, to] = line.split("-");
		return { from, to };
	});

const getPaths = (node, path = []) => {
	if (node === "end") return path.concat(node).join(",");

	const connectedNodes = input
		.filter(({ from, to }) => from === node || to === node)
		.map(({ from, to }) => from === node ? to : from);

	const results = [];

	for (const nextNode of connectedNodes) {
		const isSmallCave = nextNode.toLowerCase() === nextNode;
		if (!isSmallCave || !path.includes(nextNode)) {
			results.push(getPaths(nextNode, path.concat(node)));
		}
	}

	return results;
};

const paths = getPaths("start").flat(Infinity);
console.log(paths.length);
