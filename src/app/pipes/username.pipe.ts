import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  constructor(private usersService: UsersService) {

  }

  transform(userId: string): string | undefined {
    return this.usersService.getUserById(userId)?.name;

  }

}
