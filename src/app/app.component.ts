import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { fontawsomeIcons } from './utils/fa-icons';

import { InfoBannerComponent } from './components/info-banner/info-banner.component';
import { mapGrid } from './utils/utils';
import { Algorithm, search } from './utils/algorithm/algorithm';
import { Cell, GRID_CONFIGS, Point } from './utils/grid';
import { bfs } from './utils/algorithm/bfs';
import { dfs } from './utils/algorithm/dfs';
import { dijkstra } from './utils/algorithm/dijktras';
import { astar } from './utils/algorithm/astar';
import { bidirectional } from './utils/algorithm/bidirectional';

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
  
  private _disabled = signal(false);
  private _algorithm = signal<Algorithm | null>(null);

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

  set algorithm(algorithm: Algorithm) {
    this._algorithm.set(algorithm);
  }

  get disabled(): boolean {
    return this._disabled();
  }

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
    if(this._disabled()) return;

    this.dragIcon = type;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    if(this._disabled()) return;
    event.preventDefault();
  }

  onDrop(event: DragEvent, row: number, col: number) {
    if(this._disabled()) return;
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
    if(this._disabled()) return;
    const node = this.grid[row][col];

    if (
      event.shiftKey && 
      (this._algorithm() === Algorithm.DIJKTRAS || this._algorithm() === Algorithm.ASTAR)
    ) {
      if (node.wall) {
        node.wall = false;
      }

      node.weight = node.weight === 15? 1 : 15;
    } else {
      if(node.weight == 15) {
        node.weight = 1;
      }

      node.wall = !node.wall;
    }
  }

  addHop() {
    if(this._disabled()) return;
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

  clearWall() {
    if(this._disabled()) return;
    for (const row of this.grid) {
      for (const node of row) {
        node.wall = false;
        node.weight = 1;
      }
    }
  }

  clearPath() {
    if(this._disabled()) return;
    var ele = document.getElementsByClassName('node');

    for(var i=0; i<ele.length; i++){
      console.log(ele[i]);
      
      ele[i].classList.remove('path');
      ele[i].classList.remove('visited_a');
      ele[i].classList.remove('visited_b');
    }
  }

  clearBoard() {
    if(this._disabled()) return;
    this.clearPath();
    this.clearWall();
  }

  async visualize() {
    if(this._disabled()) return;
    
    let func = null;
    switch (this._algorithm()) {
      case Algorithm.BREATH_FIRST_SEARCH:
        func = bfs;
        break;
      case Algorithm.DEPTH_FIRST_SERACH:
        func = dfs;
        break;
      case Algorithm.DIJKTRAS:
        func = dijkstra;
        break;
      case Algorithm.ASTAR:
        func = astar;
        break;
      case Algorithm.BIDIRECTIONAL:
        func = bidirectional;
        break;
      default:
        console.error('Invalid algorithm type provided');
    }

    this._disabled.set(true);
    if (func !== null) {
      await search(
        this.graph, 
        `${this.source[0]},${this.source[1]}`, 
        `${this.target[0]},${this.target[1]}`, 
        func, 
        `${this.hop[0]},${this.hop[1]}`, 
        this.hasHop()
      );

      this._disabled.set(false);
    }
  }
}
