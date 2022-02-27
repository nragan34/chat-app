import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { UserActiveService } from 'src/app/services/user-active.service';

import { NewsSourceComponent } from './news-source.component';

describe('NewsSourceComponent', () => {
  let component: NewsSourceComponent;
  let fixture: ComponentFixture<NewsSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NewsManagerService, UserActiveService],
      declarations: [ NewsSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
