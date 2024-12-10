import type { BunFile } from "bun";

export async function day9(file: BunFile) {
  const lines = await file.text();
  const numbers = lines.split("").map(Number);

  let disk = numbers
    .map((num, index) => {
      if (index % 2 === 0) {
        return new Array(num).fill(index / 2);
      } else {
        return new Array(num).fill(".");
      }
    })
    .filter((row) => row.length > 0);

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i].includes(".")) {
      continue;
    }

    const iLen = disk[i].length;
    const space = disk.findIndex(
      (item, index) => item.includes(".") && item.length >= iLen && index < i
    );

    if (space === -1) {
      continue;
    }

    const sLen = disk[space].length;
    if (sLen > iLen) {
      disk.splice(space, 1, ...[disk[i], new Array(sLen - iLen).fill(".")]);
      i++;
      disk.splice(i, 1, new Array(iLen).fill("."));
    } else {
      disk.splice(space, 1, disk[i]);
      disk.splice(i, 1, new Array(iLen).fill("."));
    }
  }

  const result = disk
    .flat(3)
    .reduce(
      (acc, item, index) => (Number.isInteger(item) ? acc + item * index : acc),
      0
    );

  //   while (disk.includes(".")) {
  //     let last = disk[disk.length - 1];
  //     if (disk[disk.length - 1] === ".") {
  //       disk.pop();
  //       continue;
  //     }

  //     const index = disk.findIndex((item) => item === ".");
  //     disk[index] = last;
  //     disk.pop();
  //   }

  //   const result = disk.reduce((acc, item, index) => acc + item * index, 0);

  console.log(result);
}
