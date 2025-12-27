import { AfterViewInit, Component, HostListener, inject, OnInit } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { fontawsomeIcons } from './fa-icons';
import { mapGrid } from './grid';
import { InfoBannerComponent } from './info-banner/info-banner.component';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, NavbarComponent, InfoBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  faLibray = inject(FaIconLibrary);

  rows = Array(30);
  cols = Array(60);

  source = [15, 6];
  target = [];

  wallPressed = false;

  constructor() {}

  ngOnInit(): void {
    this.faLibray.addIcons(...fontawsomeIcons);
    const window_width = window.innerWidth;
    if(window_width <= 1440 && window_width > 1250) {
      this.rows = Array(30);
      this.cols = Array(45);

      this.source = [10,5];
    }

    if(window_width <= 1250 && window_width > 1025) {
      this.rows = Array(30);
      this.cols = Array(35);

      this.source = [10,5];
    }

    if(window_width <= 1025 && window_width > 740) {
      this.rows = Array(30);
      this.cols = Array(20);

      this.source = [6,5];
    }

    if(window_width <= 740 && window_width > 450) {
      this.rows = Array(30);
      this.cols = Array(15);

      this.source = [6,5];
    }

    if(window_width <= 450 && window_width > 200) {
      this.rows = Array(30);
      this.cols = Array(12);

      this.source = [6,5];
    }
  }
  
  ngAfterViewInit(): void {
    console.log(mapGrid(30, 60));
  }

  isSource(row: number, col: number) {
    return row == this.source[0] && col == this.source[1];
  }

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, i: number, j: number) {
    event.preventDefault();
    this.source[0] = i;
    this.source[1] = j;
  }

  onClick(i: number, j: number) {
    const node = document.getElementById(`${i},${j}`);
    if (node?.classList.contains('wall')) {
      node.classList.remove('wall');
    } else if (!this.wallPressed) {
      node?.classList.add('wall')
    }
  }
}
