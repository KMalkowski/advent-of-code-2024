import type { BunFile } from "bun";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export async function day10(file: BunFile) {
  const lines = await file.text();

  const map = lines.split("\n").map((line) => line.split("").map(Number));

  let trailheads: number[][] = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        trailheads.push([i, j]);
      }
    }
  }

  let score = 0;

  // console.log(trailheads);
  // for every trailhead start to walk

  let trailheadScores: Record<string, number[][]> = {};
  for (let i = 0; i < trailheads.length; i++) {
    trailheadScores[`${trailheads[i]}`] = [];
    let trailPoints = [trailheads[i]];
    while (trailPoints.length) {
      const curr = trailPoints[trailPoints.length - 1];
      trailPoints.splice(trailPoints.length - 1, 1);

      for (let j = 0; j < directions.length; j++) {
        const nextInDir = [
          curr[0] + directions[j][0],
          curr[1] + directions[j][1],
        ];

        if (
          nextInDir[0] < 0 ||
          nextInDir[1] < 0 ||
          nextInDir[0] >= map.length ||
          nextInDir[1] >= map[0].length ||
          map[nextInDir[0]][nextInDir[1]] !== map[curr[0]][curr[1]] + 1
        ) {
          continue;
        }

        if (map[nextInDir[0]][nextInDir[1]] === 9) {
          console.log("scores", trailheadScores[`${trailheads[i]}`]);
          console.log(
            "nextInDir",
            trailheadScores[`${trailheads[i]}`].find(
              (i) => i[0] === nextInDir[0] && i[1] === nextInDir[1]
            )
          );
          if (
            !trailheadScores[`${trailheads[i]}`].find(
              (i) => i[0] === nextInDir[0] && i[1] === nextInDir[1]
            )
          ) {
            trailheadScores[`${trailheads[i]}`].push(nextInDir);
          }
        } else {
          trailPoints.push(nextInDir);
        }
      }

      console.log(trailPoints);
    }
    console.log(trailheadScores);
    console.log(
      Object.values(trailheadScores).reduce((acc, i) => acc + i.length, 0)
    );
  }
}

// 1. you at 0
// 2. you go to the top, have 1,
