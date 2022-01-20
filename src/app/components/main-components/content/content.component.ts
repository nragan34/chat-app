import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  husqs: any = [
    {
      name: 'Nick Ragan',
      message: 'some message... '
    },
    {
      name: 'Person 2',
      message: 'some message... '
    },
    {
      name: 'Person 3',
      message: 'some message... '
    }
  ]

  myNews: any = [
    {
      title: 'Article 1',
      article: 'some message.... '
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
