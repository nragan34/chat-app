import { TestBed } from '@angular/core/testing';

import { NewsTimelineService } from './news-timeline.service';

describe('NewsTimelineService', () => {
  let service: NewsTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
