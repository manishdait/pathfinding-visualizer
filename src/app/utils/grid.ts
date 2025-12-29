export type Point = [x: number,y: number];

export interface Cell {
  wall: boolean;
  weight: number;
}

interface GridConfig {
  maxWidth: number;
  rows: number;
  cols: number;
  source: Point;
  target: Point;
}

export const GRID_CONFIGS: GridConfig[] = [
  { maxWidth: 450,  rows: 30, cols: 12, source: [6, 3], target: [6, 9] },
  { maxWidth: 740,  rows: 30, cols: 15, source: [6, 5], target: [6, 11]},
  { maxWidth: 1025, rows: 30, cols: 20, source: [6, 5], target: [6, 11] },
  { maxWidth: 1250, rows: 30, cols: 35, source: [10, 5], target: [10, 30] },
  { maxWidth: 1440, rows: 30, cols: 45, source: [10, 5], target: [10, 30] },
  { maxWidth: Infinity, rows: 30, cols: 60, source: [15, 6], target: [15, 40] },
];

