import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsOutletsComponent } from './news-outlets.component';

describe('NewsOutletsComponent', () => {
  let component: NewsOutletsComponent;
  let fixture: ComponentFixture<NewsOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsOutletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
