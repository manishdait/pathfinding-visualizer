import { Component } from '@angular/core';
import { TutorialComponent } from '../tutorial.component';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {

  constructor(private tutorialComponent: TutorialComponent) {}

  previous() {
    this.tutorialComponent.previous();
  }

  next() {
    this.tutorialComponent.next();
  }

  skip() {
    this.tutorialComponent.skip();
  }

}
