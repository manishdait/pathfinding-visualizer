import { Component, Input } from '@angular/core';
import { CardTemplate } from './card_template';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() card_template!: CardTemplate;

}
