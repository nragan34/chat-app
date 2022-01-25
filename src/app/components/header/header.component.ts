import { Component, OnInit } from '@angular/core';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// tells js we are allowed to use this header externally
export class HeaderComponent implements OnInit {
  userActiveId: string = '1'

  constructor(private userActive: UserActiveService) {
    this.userActive.activeUser$.subscribe(userId => this.userActiveId = userId)
   }

  ngOnInit(): void {
  }

}
