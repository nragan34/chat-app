// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  LOGIN_URL: 'http://localhost:4200',
  IS_LOGGEDIN_URL: 'http://localhost:4200/timeline',
  weather: {
    baseURL: 'https://api.open-meteo.com/v1/forecast?latitude=41.25&longitude=-96.18&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FChicago'
  },
  newsapi: {
    baseURL: 'https://api.thenewsapi.com/v1/news/all?',
    apiKey: 'api_token=KUmmrTkhayBf0DBQTzldrtZV6hed08ckWjlVh8JS&search='
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
