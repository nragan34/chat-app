import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// tells js we are allowed to use this header externally
export class HeaderComponent implements OnInit {
  userActive: Users | undefined
  AUTH_DATA = 'AUTH_DATA'

  constructor(private userActiveService: UserActiveService) {
    this.userActiveService.activeUser$.subscribe(userId => this.userActive = userId)
    console.log('logging userActiveId',this.userActive);
  }

  ngOnInit(): void {
  }

}
