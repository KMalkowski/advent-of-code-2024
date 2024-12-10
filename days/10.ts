import type { BunFile } from "bun";

export async function day10(file: BunFile) {
  const lines = await file.text();

  const numbers = lines.split("\n").map((line) => line.split("").map(Number));

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let trailheads: number[][] = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers[i].length; j++) {
      if (numbers[i][j] === 0) {
        trailheads.push([i, j]);
      }
    }
  }

  console.log("trailheads", trailheads);

  let score = 0;

  function walkTrail(start: number[], map: number[][]) {
    if (map[start[0]][start[1]] === 9) {
      score++;
      return;
    }

    let current = start;
    for (let i = 0; i < directions.length; i++) {
      const [x, y] = directions[i];
      const newX = current[0] + x;
      const newY = current[1] + y;

      if (newX < 0 || newX >= map.length || newY < 0 || newY >= map[0].length) {
        continue;
      }

      if (map[newX][newY] === map[current[0]][current[1]] + 1) {
        walkTrail([newX, newY], map);
      }
    }
  }

  for (let i = 0; i < trailheads.length; i++) {
    walkTrail(trailheads[i], numbers);
  }

  console.log(score);
}
