import type { BunFile } from "bun";

export async function day5(file: BunFile) {
  const text = await file.text();
  const lines = text.split("\n\n");
  const rules = lines[0].split("\n");
  const numbers = lines[1].split("\n");

  const beforeRules: Record<string, string[]> = {};
  const afterRules: Record<string, string[]> = {};

  for (const rule of rules) {
    const [left, right] = rule.split("|");
    beforeRules[left] = beforeRules[left]
      ? [...beforeRules[left], right]
      : [right];

    afterRules[right] = afterRules[right]
      ? [...afterRules[right], left]
      : [left];
  }

  const middleNumbersIndexes = [];
  const newMiddleNumbersIndexes = [];
  const numbersArr = numbers.map((n) => n.split(","));
  //   console.log(numbersArr);
  outer: for (const number of numbersArr) {
    let currentNumber = number;

    whileloop: while (true) {
      for (const [index, num] of currentNumber.entries()) {
        if (afterRules[num]) {
          const restOfNumbers = currentNumber.slice(index + 1);

          for (const [restNumIndex, restNum] of restOfNumbers.entries()) {
            if (afterRules[num].includes(restNum)) {
              currentNumber = orderNumbers(currentNumber, afterRules);
              newMiddleNumbersIndexes.push(
                currentNumber[Math.floor(currentNumber.length / 2)]
              );
              continue whileloop;
            }
          }
        }
      }
      break whileloop;
    }

    middleNumbersIndexes.push(
      currentNumber[Math.floor(currentNumber.length / 2)]
    );
  }
  const middleSum = middleNumbersIndexes.reduce(
    (acc, curr) => acc + Number(curr),
    0
  );
  const newMiddleSum = newMiddleNumbersIndexes.reduce(
    (acc, curr) => acc + Number(curr),
    0
  );

  console.log("middleSum", middleSum);
  console.log("newMiddleSum", newMiddleSum);
}

function orderNumbers(
  numberList: string[],
  afterRules: Record<string, string[]>
) {
  let orderedNumbers = numberList;
  for (const [index, num] of orderedNumbers.entries()) {
    if (afterRules[num]) {
      const restOfNumbers = orderedNumbers.slice(index + 1);
      for (const [restNumIndex, restNum] of restOfNumbers.entries()) {
        if (afterRules[num].includes(restNum)) {
          [orderedNumbers[index], orderedNumbers[index + restNumIndex + 1]] = [
            restNum,
            num,
          ];
          orderedNumbers = orderNumbers(orderedNumbers, afterRules);
          break;
        }
      }
    }
  }

  return orderedNumbers;
}
