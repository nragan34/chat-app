import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// tells js we are allowed to use this header externally
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
