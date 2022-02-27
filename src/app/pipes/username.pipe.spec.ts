import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from '../services/users.service';
import { UsernamePipe } from './username.pipe';

describe('UsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new UsernamePipe(new UsersService(new LocalStorageService()));
    expect(pipe).toBeTruthy();
  });
});
