import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HusqTimelineService } from 'src/app/services/husq-timeline.service';
import { UsersService } from 'src/app/services/users.service';

import { HusqViewComponent } from './husq-view.component';

describe('HusqViewComponent', () => {
  let component: HusqViewComponent;
  let fixture: ComponentFixture<HusqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HusqTimelineService, UsersService],
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
