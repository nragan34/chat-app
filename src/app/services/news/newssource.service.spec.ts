import { TestBed } from '@angular/core/testing';

import { NewssourceService } from './newssource.service';

describe('NewssourceService', () => {
  let service: NewssourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewssourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
