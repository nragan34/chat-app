import { TestBed } from '@angular/core/testing';

import { UserFriendsService } from './user-friends.service';

describe('UserFriendsService', () => {
  let service: UserFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
