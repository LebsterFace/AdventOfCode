const HEX_TO_BIN = (hex: any) => hex
	.replaceAll("0", "0000")
	.replaceAll("1", "0001")
	.replaceAll("2", "0010")
	.replaceAll("3", "0011")
	.replaceAll("4", "0100")
	.replaceAll("5", "0101")
	.replaceAll("6", "0110")
	.replaceAll("7", "0111")
	.replaceAll("8", "1000")
	.replaceAll("9", "1001")
	.replaceAll("A", "1010")
	.replaceAll("B", "1011")
	.replaceAll("C", "1100")
	.replaceAll("D", "1101")
	.replaceAll("E", "1110")
	.replaceAll("F", "1111") as string;

type OperatorPacket = {
	subpackets: Packet[];
	version: number;
	type: number;
};

type LiteralPacket = {
	version: number;
	type: number;
	value: number;
};

export type Packet = LiteralPacket | OperatorPacket;

export const isLiteral = (packet: Packet): packet is LiteralPacket => packet.type === 4;

export default class Parser {
	public index = 0;

	constructor(public source: string) {
		this.source = HEX_TO_BIN(source);
	}

	read(length: number) {
		const bits = this.source.slice(this.index, this.index + length);
		if (bits.length < length) throw new Error("Unexpected EOF");
		this.index += length;
		return bits;
	}

	parseNumber(length: number) {
		return parseInt(this.read(length), 2);
	}

	parseVersion() {
		return this.parseNumber(3);
	}

	parseType() {
		return this.parseNumber(3);
	}

	parseLiteral() {
		let result = "";
		let currentGroup: string = "";
		do {
			currentGroup = this.read(5);
			result += currentGroup.slice(1);
		} while (currentGroup.charAt(0) === "1");

		return { value: parseInt(result, 2) };
	}

	parseOperator() {
		const lengthType = this.parseNumber(1);
		const field = this.parseNumber(lengthType === 0 ? 15 : 11);
		const subpackets: Packet[] = [];
		if (lengthType === 0) {
			// field = total length in bits of the sub-packets
			const startingIndex = this.index;
			while (this.index < startingIndex + field)
				subpackets.push(this.parsePacket());
		} else {
			// field number of sub-packets immediately contained
			for (let i = 0; i < field; i++) {
				subpackets.push(this.parsePacket());
			}
		}

		return { subpackets };
	}

	parsePacket(): Packet {
		const version = this.parseVersion();
		const type = this.parseType();
		const other = type === 4 ? this.parseLiteral() : this.parseOperator();
		return { version, type, ...other };
	}

	getVersionSum() {
		const root = this.parsePacket();
		const queue = [root];
		let sum = 0;
		for (const packet of queue) {
			if (!isLiteral(packet)) {
				queue.push(...packet.subpackets);
			}

			sum += packet.version;
		}

		return sum;
	}
}