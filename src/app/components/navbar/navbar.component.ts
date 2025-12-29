import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DropdownComponent } from '../dropdown/dropdown.component';
import { AppComponent } from '../../app.component';
import { MAZES } from '../../utils/constant';
import { Algorithm } from '../../utils/algorithm/algorithm';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  appComponent = inject(AppComponent);
  
  menuList = signal<boolean>(false);

  algorithms: string[] = Object.values(Algorithm);
  mazes: string[] = MAZES;

  selected_algorithm = signal<Algorithm | null>(null);
  
  disabled() {
    return this.appComponent.disabled;
  }

  toggleMenu() {
    this.menuList.update(toggle => !toggle);
  }

  onAlgoSelect(algorithm: string) {
    if (this.appComponent.disabled) return;

    this.selected_algorithm.set(algorithm as Algorithm);
    this.appComponent.algorithm = this.selected_algorithm()!;
  }

  visualize() {
    if (this.appComponent.disabled) return;
    
    if (this.selected_algorithm()) {
      this.menuList.set(false);
      this.appComponent.visualize();
    }

    console.warn("Select an algorithm to visualize");
  }

  addHop() {
    this.appComponent.addHop();
  }

  clearPath() {
    this.appComponent.clearPath();
  }
  
  clearWall() {
    this.appComponent.clearWall();
  }

  clearBoard() {
    this.appComponent.clearBoard();
  }
}
