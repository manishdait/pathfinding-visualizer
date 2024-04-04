import { Component } from '@angular/core';
import { CardTemplate } from './card/card_template';
import { CardComponent } from './card/card.component';
import { tutorials } from './tutorial';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css'
})
export class TutorialComponent {

  page_number: number  = 1;

  tutorials: CardTemplate[] = tutorials;

  next(): void {
    this.page_number++;
    if(this.page_number > this.tutorials.length){
      document.getElementById('pop_up')?.remove();
    }
  }

  previous(): void {
    if(this.page_number  > 1){
      this.page_number--;
    }
  }


  skip(): void {
    document.getElementById('pop_up')?.remove();
  }

}
