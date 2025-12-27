import { Component, input, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dropdown',
  imports: [FontAwesomeModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {
  placeholder = input.required<string>();
  options = input.required<string[]>();

  value = signal<string>('');
  toggle = signal<boolean>(false);

  constructor() {}
  
  ngOnInit(): void {
    this.value.set(this.placeholder());
  }

  toggleOptions() {
    this.toggle.update(toggle => !toggle);
  }

  setValue(value: string) {
    this.value.set(value);
    this.toggleOptions();
  }
}
