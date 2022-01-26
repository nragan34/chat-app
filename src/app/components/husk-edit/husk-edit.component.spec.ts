import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuskEditComponent } from './husk-edit.component';

describe('HuskEditComponent', () => {
  let component: HuskEditComponent;
  let fixture: ComponentFixture<HuskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuskEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
