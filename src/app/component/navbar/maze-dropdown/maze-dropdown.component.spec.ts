import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeDropdownComponent } from './maze-dropdown.component';

describe('MazeDropdownComponent', () => {
  let component: MazeDropdownComponent;
  let fixture: ComponentFixture<MazeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MazeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
