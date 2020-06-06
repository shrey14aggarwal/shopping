import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDescriptionComponent } from './phone-description.component';

describe('PhoneDescriptionComponent', () => {
  let component: PhoneDescriptionComponent;
  let fixture: ComponentFixture<PhoneDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
