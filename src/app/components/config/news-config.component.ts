import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import {  NewsConfigService } from 'src/app/services/news/news-config.service';

@Component({
  selector: 'app-config',
  templateUrl: './news-config.component.html',
  styleUrls: ['./news-config.component.scss']
})
export class NewsConfigComponent implements OnInit {

  error: any;
  headers: string[] = [];
  config: News | undefined
  
  constructor(private configService: NewsConfigService) { }

  // clear() {
  //   this.config = undefined;
  //   this.error = undefined;
  //   this.headers = [];
  // }
  
  // showConfig() {
  //   this.configService.getConfig()
  //     .subscribe(
  //       (data: NewsConfig) => this.config = { ...data }, // success path
  //       error => this.error = error // error path
  //     );
  // }

  // ///// ??????
  // showConfig_v1() {
  //   this.configService.getConfig()
  //     .subscribe((articles: NewsConfig) => this.config = {
  //         articles: articles.articles
  //     });
  // }

  // // showConfigResponse
  // showConfigResponse() {
  //   this.configService.getConfigResponse()
  //     // resp is of type `HttpResponse<Config>`
  //     .subscribe(resp => {
  //       // display its headers
  //       const keys = resp.headers.keys();
  //       this.headers = keys.map(key =>
  //         `${key}: ${resp.headers.get(key)}`);
  //       // access the body directly, which is typed as `Config`.
  //       this.config = { ...resp.body! };
  //     });
  // }

  // makeError() {
  //   this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  // }

  // getType(val: any): string {
  //   return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  // }

  ngOnInit(): void {
  }

}
