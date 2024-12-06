import type { BunFile } from "bun";

const directions: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function nextDir(dir: [number, number]) {
  const dirValues = directions.findIndex(
    (d) => d[0] === dir[0] && d[1] === dir[1]
  );
  const nextInd = dirValues + 1;
  if (nextInd === 4) {
    return directions[0];
  }
  return directions[nextInd];
}

function walk(lines: string[][], pos: [number, number]) {
  const path: [number, number][] = [];
  let currDir: [number, number] = [-1, 0];
  let currPos = pos;
  let beenPlaces: Record<string, boolean> = {};
  let loop = false;

  let nextPos: [number, number] = [
    currPos[0] + currDir[0],
    currPos[1] + currDir[1],
  ];

  while (true) {
    nextPos = [currPos[0] + currDir[0], currPos[1] + currDir[1]];
    if (
      nextPos[0] < 0 ||
      nextPos[0] >= lines.length ||
      nextPos[1] < 0 ||
      nextPos[1] >= lines[nextPos[0]].length
    ) {
      break;
    }

    if (lines[nextPos[0]][nextPos[1]] === "#") {
      currDir = nextDir(currDir);
      continue;
    }

    if (beenPlaces[`${currPos[0]}-${currPos[1]}-${currDir[0]}-${currDir[1]}`]) {
      loop = true;
      break;
    } else {
      beenPlaces[`${currPos[0]}-${currPos[1]}-${currDir[0]}-${currDir[1]}`] =
        true;
    }

    path.push(currPos);
    currPos = nextPos;
  }

  return { path, loop };
}

export async function day6(file: BunFile) {
  const text = await file.text();
  let lines = text.split("\n").map((l) => l.split(""));

  let firstPos: [number, number] = [0, 0];
  for (let i = 0; i < lines.length; i++) {
    const ind = lines[i].indexOf("^");
    if (ind !== -1) {
      firstPos = [i, ind];
      break;
    }
  }

  let loopCount = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (i === firstPos[0] && j === firstPos[1]) continue;
      if (lines[i][j] !== "#") {
        const newLines = lines.map((l) => l.slice());
        newLines[i][j] = "#";
        const newPath = walk(newLines, firstPos);
        if (newPath.loop) {
          loopCount++;
        }
      }
    }
  }

  console.log("loopCount", loopCount);
}

// PART 1
// while (true) {
//   const nextPos: [number, number] = [
//     currPos[0] + currDir[0],
//     currPos[1] + currDir[1],
//   ];

//   if (
//     nextPos[0] < 0 ||
//     nextPos[0] >= lines.length ||
//     nextPos[1] < 0 ||
//     nextPos[1] >= lines[nextPos[0]].length
//   ) {
//     break;
//   }

//   if (lines[nextPos[0]][nextPos[1]] === "#") {
//     currDir = nextDir(currDir);
//     continue;
//   }

//   if (beenPlaces[`${nextPos[0]}-${nextPos[1]}-${currDir[0]}-${currDir[1]}`]) {
//     break;
//   }

//   beenPlaces[`${nextPos[0]}-${nextPos[1]}-${currDir[0]}-${currDir[1]}`] =
//     true;

//   visited++;
//   currPos = nextPos;
// }
// console.log(Object.keys(beenPlaces).length);
