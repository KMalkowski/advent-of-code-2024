import type { BunFile } from "bun";

export async function day8(file: BunFile) {
  const text = await file.text();
  const map = text.split("\n").map((line) => line.split(""));

  const frequencyLocations: Record<string, number[][]> = {};
  for (const [rowIndex, row] of map.entries()) {
    for (const [columnIndex, cell] of row.entries()) {
      if (cell === ".") continue;
      if (frequencyLocations[cell]) {
        frequencyLocations[cell].push([rowIndex, columnIndex]);
      } else {
        frequencyLocations[cell] = [[rowIndex, columnIndex]];
      }
    }
  }

  const antiNodes: Record<string, boolean> = {};
  console.log(frequencyLocations);
  for (const [key, value] of Object.entries(frequencyLocations)) {
    for (const [index, location] of value.entries()) {
      antiNodes[`${location[0]},${location[1]}`] = true;
      for (const [otherIndex, otherLocation] of value.entries()) {
        if (index === otherIndex) continue;

        const offsetRow = Math.max(
          location[0] - otherLocation[0],
          otherLocation[0] - location[0]
        );

        const offsetColumn = Math.max(
          location[1] - otherLocation[1],
          otherLocation[1] - location[1]
        );

        let anARow = undefined;
        let anAColumn = undefined;

        let anBRow = undefined;
        let anBColumn = undefined;

        while (true) {
          if (location[0] > otherLocation[0]) {
            anARow =
              anARow !== undefined
                ? anARow + offsetRow
                : location[0] + offsetRow;
          } else {
            anARow =
              anARow !== undefined
                ? anARow - offsetRow
                : location[0] - offsetRow;
          }

          if (location[1] > otherLocation[1]) {
            anAColumn =
              anAColumn !== undefined
                ? anAColumn + offsetColumn
                : location[1] + offsetColumn;
          } else {
            anAColumn =
              anAColumn !== undefined
                ? anAColumn - offsetColumn
                : location[1] - offsetColumn;
          }

          if (
            anARow > -1 &&
            anAColumn > -1 &&
            anARow < map.length &&
            anAColumn < map[0].length
          ) {
            antiNodes[`${anARow},${anAColumn}`] = true;
          } else {
            break;
          }
        }

        while (true) {
          if (location[0] > otherLocation[0]) {
            anBRow =
              anBRow !== undefined
                ? anBRow - offsetRow
                : otherLocation[0] - offsetRow;
          } else {
            anBRow =
              anBRow !== undefined
                ? anBRow + offsetRow
                : otherLocation[0] + offsetRow;
          }

          if (location[1] > otherLocation[1]) {
            anBColumn =
              anBColumn !== undefined
                ? anBColumn - offsetColumn
                : otherLocation[1] - offsetColumn;
          } else {
            anBColumn =
              anBColumn !== undefined
                ? anBColumn + offsetColumn
                : otherLocation[1] + offsetColumn;
          }

          if (
            anBRow > -1 &&
            anBColumn > -1 &&
            anBRow < map.length &&
            anBColumn < map[0].length
          ) {
            antiNodes[`${anBRow},${anBColumn}`] = true;
          } else {
            break;
          }
        }

        // if (location[0] > otherLocation[0]) {
        //   anARow = location[0] + offsetRow;
        //   anBRow = otherLocation[0] - offsetRow;
        // } else {
        //   anBRow = otherLocation[0] + offsetRow;
        //   anARow = location[0] - offsetRow;
        // }

        // if (location[1] > otherLocation[1]) {
        //   anAColumn = location[1] + offsetColumn;
        //   anBColumn = otherLocation[1] - offsetColumn;
        // } else {
        //   anBColumn = otherLocation[1] + offsetColumn;
        //   anAColumn = location[1] - offsetColumn;
        // }

        // console.log(location, otherLocation);
        // console.log(anARow, anAColumn, anBRow, anBColumn);

        // if (
        //   anARow > -1 &&
        //   anAColumn > -1 &&
        //   anARow < map.length &&
        //   anAColumn < map[0].length
        // )
        //   antiNodes[`${anARow},${anAColumn}`] = true;

        // if (
        //   anBRow > -1 &&
        //   anBColumn > -1 &&
        //   anBRow < map.length &&
        //   anBColumn < map[0].length
        // )
        //   antiNodes[`${anBRow},${anBColumn}`] = true;
      }
    }
  }

  console.log(antiNodes);
  console.log(Object.keys(antiNodes).length);

  //   console.log(frequencyLocations);
}
