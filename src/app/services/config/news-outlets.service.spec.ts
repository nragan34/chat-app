import { TestBed } from '@angular/core/testing';

import { NewsOutletsService } from './news-outlets.service';

describe('NewsOutletsService', () => {
  let service: NewsOutletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsOutletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
