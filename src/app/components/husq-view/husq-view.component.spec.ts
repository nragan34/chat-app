import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusqViewComponent } from './husq-view.component';

describe('HusqViewComponent', () => {
  let component: HusqViewComponent;
  let fixture: ComponentFixture<HusqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusqViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
