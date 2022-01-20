import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  image: string = 'image placeholder'
  name: string = 'Nick Ragan'
  description: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  likes: string = 'likes placeholder'
  tagLine: string = 'this is a tag line placeholder'

  time: Date = new Date()


  constructor() { }

  ngOnInit(): void {
  }

}
