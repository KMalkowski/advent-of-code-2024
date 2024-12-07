import type { BunFile } from "bun";

export async function day7(input: BunFile) {
  const lines = (await input.text()).split("\n");
  const parts = lines.map((line) => {
    const [left, right] = line.split(": ");
    return {
      left: parseInt(left),
      right: right.split(" ").map(Number),
    };
  });

  let results = 0;

  for (let i = 0; i < parts.length; i++) {
    console.log(parts[i].right);
    const combinations: number[][] = [];
    const slots = parts[i].right.length - 1;
    console.log("slots", slots);

    // Generate all possible operator combinations
    const operators = [0, 1, 2];

    generateCombinations([], 0, slots, combinations, operators);

    let combinationResult = 0;
    for (const combination of combinations) {
      combinationResult = parts[i].right[0];
      for (let j = 1; j < parts[i].right.length; j++) {
        if (combination[j - 1] === 0) {
          combinationResult += parts[i].right[j];
        } else if (combination[j - 1] === 1) {
          combinationResult *= parts[i].right[j];
        } else {
          combinationResult = Number(
            `${combinationResult}${parts[i].right[j]}`
          );
        }
      }

      if (parts[i].left === combinationResult) {
        console.log("match", combinationResult);
        results += combinationResult;
        break;
      }
    }
  }

  console.log("results", results);
}

function generateCombinations(
  current: number[],
  depth: number,
  slots: number,
  combinations: number[][],
  operators: number[]
) {
  if (depth === slots) {
    combinations.push([...current]);
    return;
  }

  for (const op of operators) {
    current.push(op);
    generateCombinations(current, depth + 1, slots, combinations, operators);
    current.pop();
  }
}
