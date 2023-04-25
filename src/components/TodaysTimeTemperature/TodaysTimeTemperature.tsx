import React from "react";
import { TimeTemperatureData } from "../../utilities/DateConstants";
import styles from './TodaysTimeTemperatureList.module.css';

interface Props {
  data?: TimeTemperatureData[];
  isCelsius: boolean;
}

const TimeTemperatureList: React.FC<Props> = ({ data , isCelsius }) => {
  const unitSymbol = isCelsius ? '°C' : '°F';

  return (
    < >
      {data?.map(({ time, temperature }) => (
       <div key={time} className={styles.timeTemperatureItem}>
         <div className={styles.timeText}>{time}</div>
         <div className={styles.temperatureText}>{temperature + unitSymbol}</div>
       </div>
      ))}
    </>
  );
};

export default TimeTemperatureList;
