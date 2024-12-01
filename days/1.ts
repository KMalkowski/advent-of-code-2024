import type { BunFile } from "bun";

export async function day1(file: BunFile) {
  const text = await file.text();
  const lines = text.split("\n");
  const one = [];
  const two = [];

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split("   ");
    one.push(parts[0]);
    two.push(parts[1]);
  }

  let distance = 0;

  //   one.sort();
  //   two.sort();

  //   for (let i = 0; i < lines.length; i++) {
  //     distance += Math.max(one[i], two[i]) - Math.min(one[i], two[i]);
  //   }

  const nums: { [key: string]: number } = {};

  for (let i = 0; i < two.length; i++) {
    if (nums[two[i]] === undefined) {
      nums[two[i]] = 1;
    } else {
      nums[two[i]] += 1;
    }
  }

  console.log(nums);

  let result = 0;
  for (let i = 0; i < one.length; i++) {
    if (nums[one[i]] === undefined) continue;
    console.log(Number(one[i]));
    console.log(nums[one[i]]);
    result += nums[one[i]] * Number(one[i]);
  }

  console.log(result);
}
