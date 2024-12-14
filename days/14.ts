import type { BunFile } from "bun";

export async function day14(file: BunFile) {
  const input = await file.text();
  const guards = input.split("\n").map((line) => {
    const [x, y] = line
      .substring(line.indexOf("p=") + 2, line.indexOf("v="))
      .split(",")
      .map(Number);

    const [vx, vy] = line
      .substring(line.indexOf("v=") + 2)
      .split(",")
      .map(Number);
    return [x, y, vx, vy];
  });

  console.log(guards);

  const maxX = 101;
  const maxY = 103;

  for (let i = 0; i < 100000; i++) {
    guards.forEach(([x, y, vx, vy], index) => {
      let newX = x + vx;
      let newY = y + vy;

      if (newX + 1 > maxX) {
        newX = newX - maxX;
      } else if (newX < 0) {
        newX = maxX + newX;
      }

      if (newY + 1 > maxY) {
        newY = newY - maxY;
      } else if (newY < 0) {
        newY = maxY + newY;
      }

      guards[index] = [newX, newY, vx, vy];
    });

    for (let y = 0; y < maxY; y++) {
      let line = "";
      for (let x = 0; x < maxX; x++) {
        if (guards.some(([gx, gy]) => gx === x && gy === y)) {
          line += "#";
        } else {
          line += " ";
        }
      }
      if (line.includes("##############")) {
        console.log(line);
        console.log(i);
        break;
      }
    }
    // console.log(i);
  }

  //   console.log(guards.join("\n"));

  //   const guardsWithOutMiddleLane = guards.filter(
  //     ([x, y]) => y + 1 !== Math.ceil(maxY / 2) && x + 1 !== Math.ceil(maxX / 2)
  //   );

  //   const result =
  //     guardsWithOutMiddleLane.filter(
  //       ([x, y]) => x + 1 < Math.ceil(maxX / 2) && y + 1 < Math.ceil(maxY / 2)
  //     ).length *
  //     guardsWithOutMiddleLane.filter(
  //       ([x, y]) => x + 1 > Math.ceil(maxX / 2) && y + 1 > Math.ceil(maxY / 2)
  //     ).length *
  //     guardsWithOutMiddleLane.filter(
  //       ([x, y]) => x + 1 > Math.ceil(maxX / 2) && y + 1 < Math.ceil(maxY / 2)
  //     ).length *
  //     guardsWithOutMiddleLane.filter(
  //       ([x, y]) => x + 1 < Math.ceil(maxX / 2) && y + 1 > Math.ceil(maxY / 2)
  //     ).length;

  //   console.log(result);
}
