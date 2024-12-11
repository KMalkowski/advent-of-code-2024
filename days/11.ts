import type { BunFile } from "bun";

export async function day11(file: BunFile) {
  const lines = await file.text();

  let numbers: string[] | string[][] = lines.split(" ");

  let numbersMap: Record<string, number> = {};
  for (let i = 0; i < numbers.length; i++) {
    numbersMap[numbers[i]] = (numbersMap[numbers[i]] ?? 0) + 1;
  }

  for (let i = 0; i < 75; i++) {
    let newNumbersMap: Record<string, number> = {};
    Object.entries(numbersMap).forEach(([number, count]) => {
      if (count === 0) return;

      if (number === "0") {
        newNumbersMap["1"] = (newNumbersMap["1"] ?? 0) + count;
      } else if (number.length % 2 === 0) {
        const half = number.length / 2;
        const first = Number(number.slice(0, half));
        const second = Number(number.slice(half));

        newNumbersMap[first.toString()] =
          (newNumbersMap[first.toString()] ?? 0) + count;
        newNumbersMap[second.toString()] =
          (newNumbersMap[Number(number.slice(half)).toString()] ?? 0) + count;
      } else {
        newNumbersMap[(Number(number) * 2024).toString()] =
          (newNumbersMap[(Number(number) * 2024).toString()] ?? 0) + count;
      }
    });

    numbersMap = newNumbersMap;
  }
  console.log(numbersMap);

  console.log(Object.values(numbersMap).reduce((a, b) => a + b, 0));
}
