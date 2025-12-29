import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dropdown',
  imports: [FontAwesomeModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {
  appComponent = inject(AppComponent);

  select = output<string>();

  placeholder = input.required<string>();
  options = input.required<string[]>();

  value = signal<string>('');
  toggle = signal<boolean>(false);

  constructor() {}
  
  ngOnInit(): void {
    this.value.set(this.placeholder());
  }

  toggleOptions() {
    if (this.appComponent.disabled) return;
    this.toggle.update(toggle => !toggle);
  }

  onSelect(value: string) {
    this.value.set(value);
    this.toggleOptions();
    this.select.emit(value);
  }
}
