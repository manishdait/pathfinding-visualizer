import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { fontawsomeIcons } from './utils/fa-icons';

import { InfoBannerComponent } from './components/info-banner/info-banner.component';
import { bfs } from './utils/algorithm/bfs';
import { mapGrid } from './utils/utils';
import { Algorithm } from './utils/algorithm/algorithm';
import { Cell, GRID_CONFIGS, Point } from './utils/grid-utils';

type DragType = 'source' | 'target' | 'hop' | null;

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, NavbarComponent, InfoBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  faLibray = inject(FaIconLibrary);
  graph: {[key:string]: string[]} = {};

  // Grid
  grid: Cell[][] = [];

  rows!: number[];
  cols!: number[];

  // Nodes
  source: Point = [15, 6];
  target: Point = [15, 40];
  hop: Point = [3, 25];

  hasHop = signal(false);

  dragIcon: DragType = null;

  constructor() {}

  ngOnInit(): void {
    this.faLibray.addIcons(...fontawsomeIcons);
    this.configureGrid(window.innerWidth);
  }

  // Resize Listener
  @HostListener('window:resize')
  onResize() {
    this.configureGrid(window.innerWidth);
  }

  // Grid
  private configureGrid(width: number): void {
    const config = GRID_CONFIGS.find(c => width <= c.maxWidth)!;

    this.rows = Array(config.rows);
    this.cols = Array(config.cols);

    this.source = config.source;
    this.target = config.target;

    this.initGrid();
    this.graph = mapGrid(this.rows.length, this.cols.length);
  }

  private initGrid() {
    this.grid = Array.from({ length: this.rows.length }, () =>
      Array.from({ length: this.cols.length }, () => ({
        wall: false,
        weight: 1
      }))
    );
  }

  // Drah Drop
  onDragStart(event: DragEvent, type: DragType) {
    this.dragIcon = type;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, row: number, col: number) {
    event.preventDefault();

    const point: Point = [row, col];

    switch (this.dragIcon) {
      case 'source':
        this.source = point;
        break;
      case 'target':
        this.target = point;
        break;
      case 'hop':
        this.hop = point;
        break;
      default:
        console.error("Invalid drag type provided");
    }

    this.dragIcon = null;
  }

  onClick(event: MouseEvent, row: number, col: number) {
    const node = this.grid[row][col];

    if (event.shiftKey) {
      node.weight = node.weight === 15? 1 : 15;
    } else {
      node.wall = !node.wall;
    }
  }

  addHop() {
    this.hasHop.update(toggle => !toggle);
  }

  isSource(row: number, col: number) {
    return row == this.source[0] && col == this.source[1];
  }

  isTarget(row: number, col: number) {
    return row == this.target[0] && col == this.target[1];
  }

  isHop(row: number, col: number) {
    if (this.hasHop()) {
      return row == this.hop[0] && col == this.hop[1];
    }
    
    return false;
  }

  visualize(algo: Algorithm) {
    switch (algo) {
      case Algorithm.BREATH_FIRST_SEARCH:
        bfs(this.graph!, `${this.source[0]},${this.source[1]}`, `${this.target[0]},${this.target[1]}`, `${this.hop[0]},${this.hop[1]}`, this.hasHop());
        break;

      default:
        console.error('Invalid algorithm type provided');
    }
  }
}
