import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopDescriptionComponent } from './laptop-description.component';

describe('LaptopDescriptionComponent', () => {
  let component: LaptopDescriptionComponent;
  let fixture: ComponentFixture<LaptopDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
