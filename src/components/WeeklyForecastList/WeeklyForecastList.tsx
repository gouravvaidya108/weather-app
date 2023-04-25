import React from 'react';
import { WeeklyForecastData } from '../../utilities/DateConstants';
import styles from './WeeklyForecastList.module.css';

interface WeeklyForecastListProps {
  data: WeeklyForecastData[];
  isCelsius: boolean;
}

const WeeklyForecastList: React.FC<WeeklyForecastListProps> = ({ data, isCelsius }) => {
  const unitSymbol = isCelsius ? '°C' : '°F';
  return (
    <div className={styles.wrapper}>
      {data.map(({ dayOfWeek, averageTemperature, icon }) => (
        <div key={dayOfWeek} className={styles.dayOfWeekContainer}>
          <div>{dayOfWeek}</div>
          <i className={`wi wi-owm-${icon}`} />
          <div>{averageTemperature + unitSymbol}</div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecastList;
