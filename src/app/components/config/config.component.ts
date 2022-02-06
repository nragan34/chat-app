import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/interfaces/config';
import {  ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  error: any;
  headers: string[] = [];
  config: Config | undefined
  
  constructor(private configService: ConfigService) { }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = [];
  }
  
  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  ///// ??????
  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe((articles: Config) => this.config = {
          articles: articles.articles,
      });
  }

  // showConfigResponse
  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }

  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }

  getType(val: any): string {
    return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  }

  ngOnInit(): void {
  }

}
