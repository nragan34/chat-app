import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsService } from 'src/app/services/friends.service';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { UserActiveService } from 'src/app/services/user-active.service';

import { HusqListComponent } from './husq-list.component';

describe('HusqListComponent', () => {
  let component: HusqListComponent;
  let fixture: ComponentFixture<HusqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ HusqTimelineService, UserActiveService, FriendsService ],
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
