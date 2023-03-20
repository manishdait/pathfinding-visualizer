import { Component, AfterViewInit, ElementRef, ViewChild, QueryList, OnInit } from '@angular/core';
import { Dijktars } from 'src/assets/Algorithms/Dijktars';
import { Grid } from 'src/assets/Grid';
import { BFS } from '../assets/Algorithms/BFS';
import { DFS } from '../assets/Algorithms/DFS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'PathFindingVisualizer';

  window_width:any = window.innerWidth;
  selectedAlgo:string = 'Algorithm'
  source:string = 'keyboard_arrow_right'

  algo:boolean = false;
  maze:boolean = false;
  dragged:any;

  isWeight:boolean = true;
  isWall:boolean = true;

  get isWeg():any{
    return this.isWeight
  }

  row:number = 28;
  col:number = 70;

  start = '[6,12]'
  end = '[6,36]'

  ngOnInit() {
    if(this.window_width <= 1440 && this.window_width > 1025){
      this.row = 35;
      this.col = 56;
    }

    if(this.window_width <= 1025 && this.window_width > 695){
      this.row = 56;
      this.col = 35;

      this.start = '[10,12]'
      this.end = '[10,20]'
    }

    if(this.window_width <= 695){
      this.row = 98;
      this.col = 20;

      this.start = '[10,7]'
      this.end = '[10,15]'
    }
  }

  graph:any = {};

 
  @ViewChild('Appnode') nodes!:QueryList<ElementRef>;

 
  

  toggleAlgo(){
    this.algo = !this.algo;
    this.maze = false;
  }

  toggleMaze(){
    this.maze = !this.maze;
    this.algo = false;
  }


  

  visualize(){
    switch(this.selectedAlgo){
      case 'Breath First Search':
        new BFS().search(this.graph,this.start, this.end);
        break;

      case 'Depth First Search':
        new DFS().search(this.graph,this.start, this.end);
        break;

      case 'Dijktras':
        new Dijktars().search(this.graph,this.start,this.end);
    }
  }

  ngAfterViewInit(){
    

    console.log("Node " +this.nodes);

    var item = this.nodes.length;

    console.log(item);
    
    

      this.graph = new Grid().mapGrid(this.row,this.col);
      var startNode = document.getElementById(this.start)!.firstChild;
      var targetNode = document.getElementById(this.end)!.firstChild;

      var img = document.createElement('span');
      img.className = 'material-symbols-outlined'
      img.classList.add('icon')
      img.innerHTML = 'emergency';
      img.draggable = true
      img.id = 'start';



      img.addEventListener("dragstart",(event) => {
        console.log("Hello");
        this.isWall = false;
        this.dragged = event!.target!;
      });


      img.addEventListener("drag",(event)=> {
        console.log("Dragging");
        
      });

      document.getElementById(this.start)!.setAttribute('weight','0');

      startNode!.appendChild(img)

      var img = document.createElement('span');
      img.className = 'material-symbols-outlined'
      img.innerHTML = 'nest_heat_link_e';
      img.classList.add('icon')
      img.draggable = true

      img.addEventListener("dragstart",(event) => {
        console.log("Hello");
        this.isWall = false;
        this.dragged = event!.target!;
      });


      img.addEventListener("drag",(event)=> {
        console.log("Dragging");
        
      });
      
      img.id = 'goal';
      targetNode!.appendChild(img);


  }


  allaowImageDrop(event:any):any{
      event.preventDefault();
  }

  imageDrop(event:any):any{
    event.preventDefault();
    console.log(this.dragged);
    console.log(event.target);
    
    
    var data = this.dragged;
    event.target.appendChild(data);
    data.style.display="block";
    this.isWall = true;
    

    if(data.id == "start"){
        this.start = event.target.parentElement.id;
    }

    if(data.id == "goal"){
        this.end = event.target.parentElement.id;;
    }
  }
}



