import { Cell, Point } from "../grid"
import { wait } from "../utils";

export async function generateRandomizedMaze(grid: Cell[][], source: Point, target: Point, hop: Point | null = null, weighted: boolean = false) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (row % 2 === 0 || col % 2 === 0) {
        if (weighted) {
          if (Math.random() < 0.5) grid[row][col].weight = 15;
        } else {
          grid[row][col].wall = Math.random() < 0.5;
        }
        await wait(15);
      }
    }
  }

  grid[source[0]][source[1]].wall = false;
  grid[target[0]][target[1]].wall = false;
  if(hop && hop !== null) {
    grid[hop[0]][hop[1]].wall = false;
  }
}