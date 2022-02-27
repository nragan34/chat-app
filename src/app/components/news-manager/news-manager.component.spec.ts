import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { NewsSourceService } from 'src/app/services/news/newssource.service';
import { UserActiveService } from 'src/app/services/user-active.service';

import { NewsManagerComponent } from './news-manager.component';

describe('NewsManagerComponent', () => {
  let component: NewsManagerComponent;
  let fixture: ComponentFixture<NewsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NewsManagerService, NewsSourceService, UserActiveService],
      declarations: [ NewsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
