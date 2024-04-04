import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  constructor (private appComponent: AppComponent) {}

  get algorithm(): string {
    return this.appComponent.selected_algorithm;
  }

}
