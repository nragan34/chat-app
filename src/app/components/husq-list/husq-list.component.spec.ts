import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusqListComponent } from './husq-list.component';

describe('HusqListComponent', () => {
  let component: HusqListComponent;
  let fixture: ComponentFixture<HusqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusqListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
