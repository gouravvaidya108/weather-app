export const MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DAYS: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface WeeklyForecastData {
  dayOfWeek: string;
  averageTemperature: string;
  icon: string;
}


export interface WeatherData {
    cod: string;
    message: string;
    cnt: number;
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      sys: {
        pod: string;
      };
      dt_txt: string;
    }[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
    main?: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    name?: string;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
  }
  
  enum WeatherTime {
    Night = "Night",
    Morning = "Morning",
    Day = "Day",
    Evening = "Evening",
  }
  
  function  mapDtTxtToTime(dtTxt: string): WeatherTime  {
    const timeString = dtTxt.slice(-8);
    switch (timeString) {
      case "00:00":
        return WeatherTime.Night;
      case "06:00":
        return WeatherTime.Morning;
      case "12:00":
        return WeatherTime.Day;
      case "18:00":
        return WeatherTime.Evening;
      default:
        return WeatherTime.Night;
    }
  }
  

  export interface TimeTemperatureData {
    time: string;
    icon: string;
    temperature: string;
  }

  export const getTodayForecastWeather = (
    response: WeatherData,
    current_date: string,
    current_datetime: number
  ): TimeTemperatureData[] => {
    let all_today_forecasts:  TimeTemperatureData [] = [];
  
    if (!response || Object.keys(response).length === 0 || response.cod === '404') {
      return [];
    } else {
      response.list?.slice().map((item) => {
        if (item.dt_txt.startsWith(current_date.substring(0, 10)) && (item.dt_txt.endsWith("00:00:00") ||
        item.dt_txt.endsWith("06:00:00") ||
        item.dt_txt.endsWith("12:00:00") ||
        item.dt_txt.endsWith("18:00:00"))   ) {
          if (item.dt > current_datetime) {
            all_today_forecasts.push({
              time: mapDtTxtToTime(item.dt_txt.split(' ')[1].substring(0, 5)),
              icon: item.weather[0].icon,
              temperature: Math.floor(item.main.temp).toString() ,
            });
          }
        }
        return all_today_forecasts;
      });
    }
      return [...all_today_forecasts];
  };
  



  export const getWeeklyForecastWeather = (
    response: WeatherData,
    current_date: string,
    current_datetime: number
  ): WeeklyForecastData[] => {
    try {
      const dailyData: Record<string, { sum: number; count: number; icons: Record<string, number> }> = {};
      const today = new Date(current_datetime).toLocaleString('en-US', { weekday: 'long' });
      if (!response || Object.keys(response).length === 0 || response.cod === '404') {
        return [];
      }
      for (const entry of response.list) {
        if(!entry.dt_txt.startsWith(current_date.substring(0, 10))){
        const date = new Date(entry.dt * 1000);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        const temp = entry.main.temp;
        const icon = entry.weather[0].id;
  
        if (!dailyData[dayOfWeek]) {
          dailyData[dayOfWeek] = { sum: 0, count: 0, icons: {} };
        }
  
        dailyData[dayOfWeek].sum += temp;
        dailyData[dayOfWeek].count += 1;
  
        if (!dailyData[dayOfWeek].icons[icon]) {
          dailyData[dayOfWeek].icons[icon] = 0;
        }
        dailyData[dayOfWeek].icons[icon] += 1;
        }
      }
  
      const dailyResults: WeeklyForecastData[] = Object.entries(dailyData).map(([dayOfWeek, { sum, count, icons }]) => {
        const mostCommonIcon = Object.entries(icons).reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev))[0];
        return {
          dayOfWeek,
          averageTemperature: Math.floor(sum / count).toString(),
          icon: mostCommonIcon,
        };
      });
      return dailyResults;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };


  