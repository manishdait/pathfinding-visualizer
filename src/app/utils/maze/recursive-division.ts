import { Cell, Point } from "../grid";
import { wait } from "../utils";

export async function generateRecursiveMaze(grid: Cell[][], source: Point, target: Point, hop: Point | null = null) {
  const rows = grid.length;
  const cols = grid[0].length;

  for(let i = 0; i < cols; i++) {
    grid[0][i].wall = true;
    grid[rows - 1][i].wall = true;
    await wait(15);
  }

  for(let i = 0; i < rows; i++) {
    grid[i][0].wall = true;
    grid[i][cols - 1].wall = true;
    await wait(15);
  }

  const divide = async (rStart: number, rEnd: number, cStart: number, cEnd: number, orientation: 'H' | 'V') => {
    const width = cEnd  - cStart;
    const height = rEnd - rStart;

    if (width < 2 || height < 2) return;

    if (orientation === 'H') {
      let wallRow = Math.floor(Math.random() * ((rEnd - rStart - 1) / 2)) * 2 + rStart + 1;
      let passageCol = Math.floor(Math.random() * ((cEnd - 1 - cStart) / 2)) * 2 + cStart;

      for (let c = cStart; c < cEnd; c++) {
        if (c !== passageCol) {
          grid[wallRow][c].wall = true;
          await wait(15);
        }
      }

      await divide(rStart, wallRow, cStart, cEnd, 'V');
      await divide(wallRow + 1, rEnd, cStart, cEnd, 'V');
    } else {
      let wallCol = Math.floor(Math.random() * ((cEnd - cStart - 1) / 2)) * 2 + cStart + 1;
      let passageRow = Math.floor(Math.random() * ((rEnd - 1 - rStart) / 2)) * 2 + rStart;

      for (let r = rStart; r < rEnd; r++) {
        if (r !== passageRow) {
          grid[r][wallCol].wall = true;
          await wait(15);
        }
      }

      await divide(rStart, rEnd, cStart, wallCol, 'H');
      await divide(rStart, rEnd, wallCol + 1, cEnd, 'H');
    }
}

  await divide(1, rows - 1, 1, cols - 1, chooseOrientation(cols - 1, rows - 1));
  
  grid[source[0]][source[1]].wall = false;
  grid[target[0]][target[1]].wall = false;
  if (hop && hop !== null) {
    grid[hop[0]][hop[1]].wall = false;
  }
}

function chooseOrientation(width: number, height: number): 'H' | 'V' {
  if (width < height) {
    return 'H';
  } else if (height < width) {
    return 'V';
  }
  
  return Math.random() > 0.5? 'H' : 'V';
}