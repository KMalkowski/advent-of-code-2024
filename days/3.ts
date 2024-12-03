import type { BunFile } from "bun";

export async function day3(file: BunFile) {
  const text = await file.text();
  let result = 0;
  let condition = true;
  for (let i = 0; i < text.length; i++) {
    if (
      text[i] === "d" &&
      text[i + 1] === "o" &&
      text[i + 2] === "(" &&
      text[i + 3] === ")"
    ) {
      condition = true;
    } else if (
      text[i] === "d" &&
      text[i + 1] === "o" &&
      text[i + 2] === "n" &&
      text[i + 3] === "'" &&
      text[i + 4] === "t" &&
      text[i + 5] === "(" &&
      text[i + 6] === ")"
    ) {
      condition = false;
    }

    if (!condition) continue;

    if (
      text[i] === "m" &&
      text[i + 1] === "u" &&
      text[i + 2] === "l" &&
      text[i + 3] === "("
    ) {
      const closeIndex = text.substring(i + 4, i + 12).indexOf(")");

      if (closeIndex > 0) {
        const nums = text.substring(i + 4, i + 4 + closeIndex).split(",");
        const num1 = parseInt(nums[0]);
        const num2 = parseInt(nums[1]);
        if (
          !Number.isNaN(num1) &&
          Number.isInteger(num1) &&
          !Number.isNaN(num2) &&
          Number.isInteger(num2)
        ) {
          result += num1 * num2;
          i += closeIndex;
        } else {
          i += 3;
        }
      } else {
        i += 3;
      }
    }
  }

  console.log(result);
  return result;
}
