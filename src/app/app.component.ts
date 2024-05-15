import { Component } from '@angular/core';
import { BFS } from '../assets/algorithm/bfs';
import { Astar } from '../assets/algorithm/a_start';
import { BiDirectional } from '../assets/algorithm/bi_directional';
import { DFS } from '../assets/algorithm/dfs';
import { Dijktars } from '../assets/algorithm/dijktars';
import { Maze } from '../assets/algorithm/maze';
import { Grid } from '../assets/helper/grid';
import { NodeComponent } from './component/node/node.component';
import { MapMazeDirective } from './directive/map-maze.directive';
import { CreateWallWeightDirective } from './directive/create-wall-weight.directive';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './component/tutorial/tutorial.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { InfoTabComponent } from './component/info-tab/info-tab.component';
import { BannerComponent } from './component/banner/banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NodeComponent, 
    TutorialComponent, 
    NavbarComponent,
    InfoTabComponent,
    BannerComponent,
    MapMazeDirective, 
    CreateWallWeightDirective, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  window_width: any = window.innerWidth;

  private _disable: boolean = false;
  private _selected_algorithm = 'Algorithm'

  source: string = 'keyboard_arrow_right';

  dragged: any;

  private _is_weight: boolean = false;
  is_wall: boolean = true;

  row: number = 28;
  col: number = 70;

  start!: string;
  end!: string;
  boom!: string;
 
  private _boom_added: boolean = false; 


  graph: {[key: string]:string[]} = {};

  get is_weight(): boolean {
    return this._is_weight;
  }

  set is_weight(is_weight: boolean) {
    this._is_weight = is_weight
  }

  get disable(): boolean {
    return this._disable;
  }

  set disable(disable: boolean) {
    this._disable = disable;
  }

  get boom_added(): boolean {
    return this._boom_added;
  }

  set boom_added(boom_added: boolean) {
    this._boom_added = boom_added;
  }

  get selected_algorithm(): string {
    return this._selected_algorithm;
  }

  set selected_algorithm(algorithm: string) {
    this._selected_algorithm = algorithm;
  }

  ngOnInit(): void {
    this.start = '[12,12]';
    this.end = '[12,58]';
    this.boom= '[12,35]';

    if(this.window_width <= 1440 && this.window_width > 1025) {
      this.row = 32;
      this.col = 56;

      this.start = '[15,5]';
      this.end = '[15,51]';
      this.boom = '[15,28]';
    }

    if(this.window_width <= 1025 && this.window_width > 695) {
      this.row = 35;
      this.col = 35;

      this.start = '[20,5]';
      this.end = '[20,30]';
      this.boom = '[20,17]';
    }

    if(this.window_width <= 695) {
      this.row = 34;
      this.col = 20;

      this.start = '[10,5]';
      this.end = '[10,15]';
      this.boom = '[10,10]';
    }
  }

  ngAfterViewInit(): void {
    this.graph = new Grid().mapGrid(this.row,this.col);
    var startNode = document.getElementById(this.start)!.firstChild;
    var targetNode = document.getElementById(this.end)!.firstChild;

    document.getElementById(this.start)!.firstElementChild!.innerHTML = '';
    document.getElementById(this.end)!.firstElementChild!.innerHTML = '';

    var img = document.createElement('span');
    img.className = 'material-symbols-outlined'
    img.classList.add('icon');
    img.innerHTML = 'emergency';
    img.draggable = true
    img.id = 'start';

    img.addEventListener("dragstart",(event) => {
      if(this.disable){
        return;
      }
      this.is_wall = false;
      this.dragged = event!.target!;
    });

    img.addEventListener("drag",(event)=> {
      if(this.disable){
        return;
      }
    });

    document.getElementById(this.start)!.setAttribute('weight','0');

    startNode!.appendChild(img)

    var img = document.createElement('span');
    img.className = 'material-symbols-outlined'
    img.innerHTML = 'nest_heat_link_e';
    img.classList.add('icon');
    img.draggable = true

    img.addEventListener("dragstart",(event) => {
      if(this.disable){
        return;
      }
      this.is_wall = false;
      this.dragged = event!.target!;
    });


    img.addEventListener("drag",(event)=> {
      if(this.disable){
        return;
      }
    });
    
    img.id = 'goal';
    targetNode!.appendChild(img);
  }

  allow_image_drop(event: any): any {
    if(this.disable){
      return;
    }
    event.preventDefault();
  }

  image_drop(event: any): any {
    if(this.disable){
      return;
    }
    event.preventDefault();
    
    var data = this.dragged;
    event.target.appendChild(data);
    data.style.display = 'block';
    this.is_wall = true;
    
    if(data.id == 'start') {
        document.getElementById(this.start)!.setAttribute('weight','1');
        this.start = event.target.parentElement.id;
        document.getElementById(this.start)!.setAttribute('weight','0');
    }
  
    if(data.id == 'goal') {
        this.end = event.target.parentElement.id;
    }
  
    if(data.id == 'boom') {
      this.boom = event.target.parentElement.id;
    }
  }

  add_boom(): void {
    if(this.boom_added) {
      this.boom_added = false;
      document.getElementById('boom')?.remove();
    } else {
      var node = document.getElementById(this.boom)!.firstChild;

      var img = document.createElement('span');
      img.className = 'material-symbols-outlined';
      img.classList.add('icon');
      img.innerHTML = 'circle';
      img.draggable = true;
      img.id = 'boom';

      img.addEventListener("dragstart",(event) => {
        if(this.disable){
          return;
        }
        this.is_wall = false;
        this.dragged = event!.target!;
      });

      img.addEventListener("drag",(event)=> {
        if(this.disable){
          return;
        }
      });
    
      node?.appendChild(img);
      this.boom_added = true;
    }
  }

  async visualize() {
    switch(this._selected_algorithm) {
      case 'Breath First Search':
        this.disable = true;
        if(this.boom_added)
          await new BFS().search_boom(this.graph,this.start,this.end,this.boom);
        else
          await new BFS().search(this.graph,this.start, this.end);

        this.disable = false;
        break;

      case 'Depth First Search':
        this.disable = true;
        if(this.boom_added)
          await new DFS().search_boom(this.graph,this.start,this.end,this.boom);
        else
          await new DFS().search(this.graph,this.start, this.end);
          this.disable = false
        break;

      case 'Dijktras':
        this.disable=true
        if(this.boom_added)
          await new Dijktars().search_boom(this.graph,this.start,this.end,this.boom);
        else
          await new Dijktars().search(this.graph,this.start, this.end);
        
        this.disable=false;
        break;

      case 'Bidirectional':
        this.disable=true
        if(this.boom_added)
          await new BiDirectional().search_boom(this.graph,this.start,this.end,this.boom);
        else
          await new BiDirectional().search(this.graph,this.start, this.end);
        
        this.disable=false;
        break

      case 'Astar':
          this.disable=true
          if(this.boom_added)
            await new Astar().search_bomb(this.graph, new Grid().mapHurestic(this.end, this.row, this.col),this.start,this.end,this.boom);
          else
            await new Astar().search(this.graph, new Grid().mapHurestic(this.end, this.row, this.col),this.start, this.end);
          
          this.disable=false;
          break;
    }
  }

  clear_board(): void {
    this.clear_path();
    this.clear_wall();
    document.getElementById(this.start)!.firstElementChild!.innerHTML = '';
    document.getElementById(this.start)!.setAttribute('weight','1');
    document.getElementById(this.end)!.firstElementChild!.innerHTML = '';
    if(this.boom_added) {
      this.boom_added = false;
      document.getElementById('boom')?.remove();
    }
    this.ngOnInit();
    this.ngAfterViewInit();
  }

  clear_wall(): void {
    var ele = document.getElementsByClassName('node-con');
    for(var i=0; i<ele.length; i++) {
      ele[i].firstElementChild?.classList.remove('wall');
      ele[i].setAttribute('weight', '1');
      if(ele[i].id != this.start && ele[i].id != this.end && ele[i].id != this.boom){
        ele[i].firstElementChild?.firstElementChild?.remove();
      }
    }

    document.getElementById(this.start)!.setAttribute('weight','0');
  }

  clear_path(): void {
    var ele = document.getElementsByClassName('node-con');
    for(var i=0; i<ele.length; i++){
      ele[i].firstElementChild?.classList.remove('path');
      ele[i].firstElementChild?.classList.remove('visited');
      ele[i].firstElementChild?.classList.remove('boom-visited');
    }
  }

  generate_wall_maze(): void {
    this.clear_wall();
    new Maze().randomMaze(this.row, this.col, this.boom);
  }

  generate_weight_maze(): void {
    this.clear_wall();
    if(this.is_weight)
      new Maze().randomWeight(this.row, this.col);
  }

}
