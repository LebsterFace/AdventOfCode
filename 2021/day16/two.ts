import Parser, { isLiteral, Packet } from "./common";

const getValue = (packet: Packet): number => {
	if (isLiteral(packet)) return packet.value;
	const subpackets = packet.subpackets.map(getValue);

	switch (packet.type) {
		// Packets with type ID 0 are sum packets - their value is the sum of the values of their sub-packets.
		//  If they only have a single sub-packet, their value is the value of the sub-packet.
		case 0:
			return subpackets.reduce((sum, current) => sum + current, 0);

		// Packets with type ID 1 are product packets - their value is the result of multiplying together the values of their sub-packets.
		// If they only have a single sub-packet, their value is the value of the sub-packet.
		case 1:
			return subpackets.reduce((sum, current) => sum * current, 1);

		// Packets with type ID 2 are minimum packets - their value is the minimum of the values of their sub-packets.
		case 2:
			return Math.min(...subpackets);

		// Packets with type ID 3 are maximum packets - their value is the maximum of the values of their sub-packets.
		case 3:
			return Math.max(...subpackets);

		// Packets with type ID 5 are greater than packets - their value is 1 if the value of the first sub-packet is greater than the value of
		// the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
		case 5:
			return subpackets[0] > subpackets[1] ? 1 : 0;

		// Packets with type ID 6 are less than packets - their value is 1 if the value of the first sub-packet is less than the value of
		// the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
		case 6:
			return subpackets[0] < subpackets[1] ? 1 : 0;

		// Packets with type ID 7 are equal to packets - their value is 1 if the value of the first sub-packet is equal to the value of
		// the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
		case 7:
			return subpackets[0] === subpackets[1] ? 1 : 0;

		default:
			throw new Error("Invalid packet type ID");
	}
};

import * as fs from "fs";

process.chdir(__dirname);
const input = fs.readFileSync("./input.txt", "utf-8");
console.log(getValue(new Parser(input).parsePacket()));