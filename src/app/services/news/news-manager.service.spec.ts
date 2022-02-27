import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage.service';

import { NewsManagerService } from './news-manager.service';

describe('NewsManagerService', () => {
  let service: NewsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(NewsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
