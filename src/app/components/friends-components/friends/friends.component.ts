import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { people } from "../../../seeds/people"

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friends: Person[] = people;

  constructor() { }

  ngOnInit(): void {
  }

}
