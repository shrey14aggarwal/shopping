import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletDescriptionComponent } from './tablet-description.component';

describe('TabletDescriptionComponent', () => {
  let component: TabletDescriptionComponent;
  let fixture: ComponentFixture<TabletDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
