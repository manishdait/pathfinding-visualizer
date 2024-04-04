import { Component } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Algorithm, algorithm_list } from './algorithm_list';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-algo-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './algo-dropdown.component.html',
  styleUrl: './algo-dropdown.component.css'
})
export class AlgoDropdownComponent {
  
  is_toggle: boolean = false;

  algorithms: Algorithm[] = algorithm_list;

  constructor (private appComponent: AppComponent) {}

  get disable(): boolean {
    return this.appComponent.disable;
  }

  get selected_algo(): string {
    return this.appComponent.selected_algorithm;
  }

  toggle(): void {
    if(!this.disable) {
      this.is_toggle = !this.is_toggle;
    }
  }

  select_algo(algorithm: Algorithm) {
    this.appComponent.is_weight = algorithm.is_weighted;
    this.appComponent.selected_algorithm = algorithm.name;
  }

}
