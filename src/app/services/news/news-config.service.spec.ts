import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NewsConfigService } from './news-config.service';

describe('ConfigService', () => {
  let service: NewsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(NewsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
