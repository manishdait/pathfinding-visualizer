import { Component } from '@angular/core';
import { AlgoDropdownComponent } from './algo-dropdown/algo-dropdown.component';
import { MazeDropdownComponent } from './maze-dropdown/maze-dropdown.component';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AlgoDropdownComponent, 
    MazeDropdownComponent,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  title: string = 'Pathfinding Visualizer';
  buttonMsg: string = 'Visualize';

  constructor (private appComponent: AppComponent) {

  }

  get disable(): boolean {
    return this.appComponent.disable;
  }

  get boom_added(): boolean {
    return this.appComponent.boom_added;
  }

  add_boom() {
    this.appComponent.add_boom();
  }

  algo_selected(): boolean {
    return this.appComponent.selected_algorithm != "Algorithm"
  }

  visualize() {
    if (!this.algo_selected()) {
      this.buttonMsg = "Pick an Algorithm to Visualize!";
      return;
    }
    this.appComponent.visualize();
  }

  clear_wall() {
    this.appComponent.clear_wall();
  }

  clear_path() {
    this.appComponent.clear_path();
  }

  clear_board() {
    this.appComponent.clear_board();
  }
}
