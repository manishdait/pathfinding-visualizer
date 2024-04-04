import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-tab.component.html',
  styleUrl: './info-tab.component.css'
})
export class InfoTabComponent {

  constructor (private appComponent: AppComponent) {}
  
  get is_weight(): boolean {
    return this.appComponent.is_weight;
  }

}
