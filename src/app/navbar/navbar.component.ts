import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  algorithms: string[] = ['Breath First Search', 'Depth First Search', 'Dijktras', 'Bidirectional', 'Astar'];
  mazes: string[] = ['Random Maze', 'Weighted Maze'];

  menuList = signal<boolean>(false);

  toggleMenu() {
    this.menuList.update(toggle => !toggle);
  }
}
