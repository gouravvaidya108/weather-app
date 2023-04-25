import { WeatherData } from "../utilities/DateConstants";

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '394ecfcff672f2c1c1c32d4381cb4995';



export function fetchWeatherData( unit: string, city?: string ,lat?: number, lon?: number,): Promise<WeatherData[]> {
  const weatherEndpoint = city
    ? `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=${unit}`
    : `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`;

  const forecastEndpoint = city
    ? `${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=${unit}`
    : `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`;

  return Promise.all([fetch(weatherEndpoint), fetch(forecastEndpoint)])
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then(([weatherResponse, forecastResponse]) => [weatherResponse, forecastResponse])
    .catch((error) => {
      console.log(error);
      throw error;
    });
}


