import type { BunFile } from "bun";

type Position = [number, number];
interface Region {
  area: number;
  perimeter: number;
  sides: number;
}

interface Side {
  minIdx: number;
  maxIdx: number;
}

const directionMap = new Map<string, Position>([
  ["DOWN", [1, 0]],
  ["UP", [-1, 0]],
  ["RIGHT", [0, 1]],
  ["LEFT", [0, -1]],
]);

function updateSideMap(
  sideMap: Map<number, Side[]>,
  primaryIdx: number,
  secondaryIdx: number
): number {
  if (!sideMap.has(primaryIdx)) {
    sideMap.set(primaryIdx, [{ minIdx: secondaryIdx, maxIdx: secondaryIdx }]);
    return 1;
  }

  let allSides: Side[] = sideMap.get(primaryIdx)!;
  let attachedSideMin: Side | undefined = allSides.find(
    (side) => side.minIdx === secondaryIdx + 1
  );
  let attachedSideMax: Side | undefined = allSides.find(
    (side) => side.maxIdx === secondaryIdx - 1
  );

  if (attachedSideMin && attachedSideMax) {
    attachedSideMin.minIdx = attachedSideMax.minIdx;
    allSides.splice(allSides.indexOf(attachedSideMax), 1);
    return -1;
  } else if (attachedSideMin) {
    attachedSideMin.minIdx--;
    return 0;
  } else if (attachedSideMax) {
    attachedSideMax.maxIdx++;
    return 0;
  }

  allSides.push({ minIdx: secondaryIdx, maxIdx: secondaryIdx });
  return 1;
}

function discoverRegion(
  map: string[][],
  visited: Set<string>,
  startPos: Position,
  mapHeight: number,
  mapWidth: number
): Region {
  const [startX, startY] = startPos;
  const plant: string = map[startX][startY];
  visited.add(`${startX}|${startY}`);

  let perimeter: number = 0;
  let area: number = 1;
  let sides: number = 0;
  let upSideMap: Map<number, Side[]> = new Map<number, Side[]>();
  let downSideMap: Map<number, Side[]> = new Map<number, Side[]>();
  let rightSideMap: Map<number, Side[]> = new Map<number, Side[]>();
  let leftSideMap: Map<number, Side[]> = new Map<number, Side[]>();
  let queue: Position[] = [startPos];

  while (queue.length) {
    const [currX, currY]: Position = queue.shift()!;

    directionMap.forEach(([dx, dy], direction) => {
      const newX: number = currX + dx;
      const newY: number = currY + dy;
      const newPosKey: string = `${newX}|${newY}`;

      if (
        newX < 0 ||
        newX >= mapHeight ||
        newY < 0 ||
        newY >= mapWidth ||
        map[newX][newY] !== plant
      ) {
        perimeter += 1;

        if (direction === "UP") {
          sides += updateSideMap(upSideMap, currX, currY);
        } else if (direction === "DOWN") {
          sides += updateSideMap(downSideMap, currX, currY);
        } else if (direction === "RIGHT") {
          sides += updateSideMap(rightSideMap, currY, currX);
        } else {
          sides += updateSideMap(leftSideMap, currY, currX);
        }
      } else if (!visited.has(newPosKey)) {
        area += 1;
        visited.add(newPosKey);
        queue.push([newX, newY]);
      }
    });
  }

  return { area, perimeter, sides };
}

function extractAllRegions(map: string[][]): Region[] {
  const mapHeight = map.length;
  const mapWidth = map[0].length;

  let regions: Region[] = [];
  let visited: Set<string> = new Set<string>();

  for (let x = 0; x < mapHeight; x++) {
    for (let y = 0; y < mapWidth; y++) {
      if (!visited.has(`${x}|${y}`)) {
        regions.push(discoverRegion(map, visited, [x, y], mapHeight, mapWidth));
      }
    }
  }

  return regions;
}

export async function day12(file: BunFile) {
  const map = (await file.text()).split("\n").map((line) => line.split(""));
  const regions: Region[] = extractAllRegions(map);

  let totalPrice: number = 0;
  let totalPriceSides: number = 0;

  for (const region of regions) {
    totalPrice += region.area * region.perimeter;
    totalPriceSides += region.area * region.sides;
  }

  console.log(`Part 1 solution: ${totalPrice}`);
  console.log(`Part 2 solution: ${totalPriceSides}`);
}
