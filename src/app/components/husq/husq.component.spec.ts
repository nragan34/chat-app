import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { LikeService } from 'src/app/services/like.service';
import { UserActiveService } from 'src/app/services/user-active.service';

import { HusqComponent } from './husq.component';

describe('HusqComponent', () => {
  let component: HusqComponent;
  let fixture: ComponentFixture<HusqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HusqTimelineService, UserActiveService, LikeService],
      declarations: [ HusqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
