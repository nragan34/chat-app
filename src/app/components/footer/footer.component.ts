import { Component, OnInit } from '@angular/core';
import { UserActiveService } from 'src/app/services/user-active.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  userActive: string | undefined
  
  constructor(private userActiveService: UserActiveService) {
    this.userActiveService.activeUser$.subscribe(userId => this.userActive = userId)
  }

  ngOnInit(): void {
  }

}
