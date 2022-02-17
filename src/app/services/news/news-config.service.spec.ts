import { TestBed } from '@angular/core/testing';

import { NewsConfigService } from './news-config.service';

describe('ConfigService', () => {
  let service: NewsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
