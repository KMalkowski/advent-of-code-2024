import type { BunFile } from "bun";

export async function day2(file: BunFile) {
  const text = await file.text();
  const lines = text.split("\n");
  let result = 0;

  outer: for (let i = 0; i < lines.length; i++) {
    const numberLine = lines[i].split(" ").map((l) => Number(l));
    const isValid = isValidLine(numberLine);
    if (isValid === true) {
      result += 1;
      continue;
    } else {
      for (let l = 0; l < numberLine.length; l++) {
        const v = isValidLine(numberLine.filter((v, i) => i !== l));
        if (v === true) {
          result += 1;
          continue outer;
        }
      }
    }
  }
  console.log(result);
}

function isValidLine(line: number[]) {
  let direction = 1;
  if (line[0] > line[1]) {
    direction = 0;
  }

  for (let i = 1; i < line.length; i++) {
    if (line[i] > line[i - 1] && direction === 0) {
      return [false, i];
    } else if (line[i] < line[i - 1] && direction === 1) {
      return [false, i];
    }

    if (
      Math.max(line[i], line[i - 1]) - Math.min(line[i], line[i - 1]) > 3 ||
      Math.max(line[i], line[i - 1]) - Math.min(line[i], line[i - 1]) === 0
    ) {
      return [false, i];
    }
  }

  return true;
}
