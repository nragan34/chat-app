import { TestBed } from '@angular/core/testing';

import { HusqTimelineService } from './husq-timeline.service';

describe('HusqTimelineComponent', () => {
  let service: HusqTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HusqTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
