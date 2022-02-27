import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage.service';

import { NewsSourceService } from './newssource.service';

describe('NewssourceService', () => {
  let service: NewsSourceService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(NewsSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
