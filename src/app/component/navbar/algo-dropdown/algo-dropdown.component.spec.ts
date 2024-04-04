import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoDropdownComponent } from './algo-dropdown.component';

describe('AlgoDropdownComponent', () => {
  let component: AlgoDropdownComponent;
  let fixture: ComponentFixture<AlgoDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgoDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
