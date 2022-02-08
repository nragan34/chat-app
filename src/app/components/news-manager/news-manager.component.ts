import { Component, OnInit } from '@angular/core';
import { NewsConfigService } from 'src/app/services/news-config/news-config.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  constructor(private newsConfigService: NewsConfigService) { }

  ngOnInit(): void {
  }

}
