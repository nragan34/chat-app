import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input() name: string = ''
  @Input() message: string = ''
  @Input() location: string = ''
  
  time: Date = new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
