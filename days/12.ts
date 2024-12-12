import type { BunFile } from "bun";

export async function day12(file: BunFile) {
  const lines = await file.text();
  const grid = lines.split("\n").map((line) => line.split(""));
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const regions: Record<string, Record<string, number[][]>> = {};
  const visited: number[][] = [];

  outer: for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (visited.find(([x, y]) => x === i && y === j)) continue;
      visited.push([i, j]);

      if (regions[`${grid[i][j]}`]) {
        let found = false;
        regionloop: for (const [key, region] of Object.entries(
          regions[`${grid[i][j]}`]
        )) {
          for (const dir of dirs) {
            const newX = i + dir[0];
            const newY = j + dir[1];

            if (
              newX >= 0 &&
              newX < grid.length &&
              newY >= 0 &&
              newY < grid[i].length &&
              region.find(([x, y]) => x === newX && y === newY)
            ) {
              regions[`${grid[i][j]}`][`${key}`].push([i, j]);
              found = true;
              break regionloop;
            }
          }
        }
        if (!found) {
          console.log("next not found, new region");
          regions[`${grid[i][j]}`][`${i},${j}`] = [[i, j]];
        }
      } else {
        console.log("first region");
        regions[`${grid[i][j]}`] = {};
        regions[`${grid[i][j]}`][`${i},${j}`] = [[i, j]];
      }
    }
  }

  console.log(
    Object.values(regions).map((r) =>
      Object.values(r).reduce((acc, r) => acc + r.length, 0)
    )
  );

  //   const cost = Object.entries(pointWalls).reduce((acc, [key, value]) => {
  //     return acc + value * regions[key];
  //   }, 0);

  //   console.log(cost);
}
