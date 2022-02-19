export const environment = {
  production: true,
  weather: {
    baseURL: 'https://api.open-meteo.com/v1/forecast?latitude=41.25&longitude=-96.18&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FChicago'
  },
  newsapi: {
    baseURL: 'https://api.thenewsapi.com/v1/news/all?',
    apiKey: 'api_token=KUmmrTkhayBf0DBQTzldrtZV6hed08ckWjlVh8JS&search='
  }
};
