with open("input.txt") as file:
	lines = [line.rstrip() for line in file]

count = 0
dial = 50
for instruction in lines:
	direction = instruction[0]
	number = int(instruction[1:])
	for i in range(number):
		if direction == "L":
			dial -= 1
		else:
			dial += 1
		if dial % 100 == 0:
			count += 1
print(count)