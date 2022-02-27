import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsConfigService } from 'src/app/services/news/news-config.service';
import { NewsManagerService } from 'src/app/services/news/news-manager.service';
import { NewsSourceService } from 'src/app/services/news/newssource.service';
import { UserActiveService } from 'src/app/services/user-active.service';

import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsManagerService, NewsSourceService, NewsConfigService, UserActiveService],
      declarations: [ NewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
