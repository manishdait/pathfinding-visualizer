import { Component } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maze-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maze-dropdown.component.html',
  styleUrl: './maze-dropdown.component.css'
})
export class MazeDropdownComponent {

  is_toggle: boolean = false;

  constructor (private appComponent: AppComponent) {}

  get disable(): boolean {
    return this.appComponent.disable;
  }

  get is_weight(): boolean {
    return this.appComponent.is_weight;
  }

  toggle(): void {
    if(!this.disable) {
      this.is_toggle = !this.is_toggle;
    }
  }

  generate_wall_maze() {
    this.appComponent.generate_wall_maze();
  }

  generate_weight_maze() {
    this.appComponent.generate_weight_maze();
  }

}
