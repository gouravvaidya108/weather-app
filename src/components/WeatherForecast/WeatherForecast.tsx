import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchWeatherData } from "../../api/ApiServices";
import {
  TimeTemperatureData,
  WeatherData,
  WeeklyForecastData,
  getTodayForecastWeather,
  getWeeklyForecastWeather,
} from "../../utilities/DateConstants";
import {
  capitalize,
  getCurrentDateFormatted,
  transformDateFormat,
} from "../../utilities/DateTimeUtils";
import TimeTemperatureList from "../TodaysTimeTemperature/TodaysTimeTemperature";
import WeeklyForecastList from "../WeeklyForecastList/WeeklyForecastList";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SwitchButton from "../Switch/SwitchButton";
import styles from './WeatherForecast.module.css';


interface Props {
  city: string;
}

function WeatherForecast(props: Props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("city");
  const lat = params.get("lat");
  const long = params.get("long");
  const [isCelsius, setIsCelsius] = useState(true);
  const navigate = useNavigate();
  const formattedDate = getCurrentDateFormatted();
  const [todaysTimeTemperature, setTodaysTimeTemperature] =
    useState<TimeTemperatureData[]>();
  const [todaysWeatherData, setTodaysWeatherData] = useState<WeatherData>();
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);


  const handleSwitchToggle = (isOn: boolean) => {

    setIsCelsius(isOn);

  };

  const fetchApi = useCallback(async (isCelsius: boolean,city?:string,lat?: number, long?: number,) => {
    setIsLoading(true);
    if ((lat !== null && long !== null) || city != null) {
      try {
        const [todayWeatherResponse, weekForecastResponse] =
          await fetchWeatherData(isCelsius? 'metric' :'imperial' ,city,lat, long);


        if(!todayWeatherResponse?.weather  || !weekForecastResponse?.list ){
          setError(todayWeatherResponse.message);
          return
        }

        const currentDate = transformDateFormat();
        console.log("current date" + currentDate);
        const date = new Date();
        let dt_now = Math.floor(date.getTime() / 1000);

        const all_today_forecasts_list = getTodayForecastWeather(
          weekForecastResponse,
          currentDate,
          dt_now
        );

        const weeklyForecastList = getWeeklyForecastWeather(
          weekForecastResponse,
          currentDate,
          dt_now
        );

        setTodaysTimeTemperature(all_today_forecasts_list);
        setTodaysWeatherData(todayWeatherResponse);
        setWeeklyForecast(weeklyForecastList);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data");
      }
      finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if ((lat !== null && long != null) || city !== null) {
      fetchApi( isCelsius,city || '' ,parseFloat(lat || ''), parseFloat(long || ''),);
    }
  }, [city, fetchApi, isCelsius, lat, long]);

  const temperature = Math.round(todaysWeatherData?.main?.temp || 0);
  const unitSymbol = isCelsius ? '°C' : '°F';
  const temperatureWithUnit = `${temperature}${unitSymbol}`;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <h2>Loading...</h2>
      </div>
    );
  }
  

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error}</h2>
      </div>
    );
  }
  return (
    <div className={styles.weatherForecastWrapper}>
      <div className={styles.header}>
        <div className={styles.headerNavigation}>
          <button
            onClick={() => navigate(-1)}
            className={styles.backButton}
          >
            <ArrowBackIcon />
          </button>
          <h2 style={{ marginLeft: '10px' }}>{todaysWeatherData?.name}</h2>
        </div>
        <div>
          <SwitchButton onSwitchToggle={handleSwitchToggle} isCelsius={isCelsius} />
        </div>
      </div>
      <div className={styles.weatherInfo}>
        <div className={styles.dateText}>
          {formattedDate}
        </div>
        <div className={styles.descriptionText}>
          { capitalize(todaysWeatherData?.weather[0]?.description || '')}
        </div>
        <div className={styles.temperatureContainer}>
          <div className={styles.temperatureText}>
            {temperatureWithUnit}
          </div>
          <div className={styles.weatherIcon}>
            <i className={`wi wi-owm-${todaysWeatherData?.weather[0].id}`} />
          </div>
          <div className={styles.listContainer}>
            <TimeTemperatureList data={todaysTimeTemperature} isCelsius={isCelsius} />
          </div> 
        </div>
        <WeeklyForecastList data={weeklyForecast || []} isCelsius={isCelsius} />
      </div>
    </div>
  );
}

export default WeatherForecast;
