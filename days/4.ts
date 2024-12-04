import type { BunFile } from "bun";

export async function day4(file: BunFile) {
  let result = 0;
  const text = await file.text();
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "X") {
        if (lines[i].substring(j, j + 4) === "XMAS") {
          result++;
        }

        if (lines[i].substring(j - 3, j + 1) === "SAMX") {
          result++;
        }

        if (
          lines[i + 1] &&
          lines[i + 1][j] === "M" &&
          lines[i + 2] &&
          lines[i + 2][j] === "A" &&
          lines[i + 3] &&
          lines[i + 3][j] === "S"
        ) {
          result++;
        }

        if (
          lines[i - 1] &&
          lines[i - 1][j] === "M" &&
          lines[i - 2] &&
          lines[i - 2][j] === "A" &&
          lines[i - 3] &&
          lines[i - 3][j] === "S"
        ) {
          result++;
        }

        if (
          lines[i + 1] &&
          lines[i + 1][j + 1] === "M" &&
          lines[i + 2] &&
          lines[i + 2][j + 2] === "A" &&
          lines[i + 3] &&
          lines[i + 3][j + 3] === "S"
        ) {
          result++;
        }
        if (
          lines[i - 1] &&
          lines[i - 1][j - 1] === "M" &&
          lines[i - 2] &&
          lines[i - 2][j - 2] === "A" &&
          lines[i - 3] &&
          lines[i - 3][j - 3] === "S"
        ) {
          result++;
        }
        if (
          lines[i - 1] &&
          lines[i - 1][j + 1] === "M" &&
          lines[i - 2] &&
          lines[i - 2][j + 2] === "A" &&
          lines[i - 3] &&
          lines[i - 3][j + 3] === "S"
        ) {
          result++;
        }
        if (
          lines[i + 1] &&
          lines[i + 1][j - 1] === "M" &&
          lines[i + 2] &&
          lines[i + 2][j - 2] === "A" &&
          lines[i + 3] &&
          lines[i + 3][j - 3] === "S"
        ) {
          result++;
        }
      }
    }
  }

  console.log(result);
  return result;
}

export async function day4_2(file: BunFile) {
  let result = 0;
  const text = await file.text();
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "A") {
        if (
          lines[i - 1] &&
          lines[i + 1] &&
          (lines[i - 1][j - 1] + lines[i + 1][j + 1] === "MS" ||
            lines[i - 1][j - 1] + lines[i + 1][j + 1] === "SM") &&
          (lines[i - 1][j + 1] + lines[i + 1][j - 1] === "MS" ||
            lines[i - 1][j + 1] + lines[i + 1][j - 1] === "SM")
        ) {
          result++;
        }
      }
    }
  }

  console.log(result);
}
