import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../SearchComponent/SearchComponent';
import LocationButton from '../LocationComponent/LocationComponent';
import styles from './Search.module.css';

interface Props {
  onCityChange: (city: string) => void;
}

function Search(props: Props) {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (city: string) => {
    setCity(city);
    props.onCityChange(city);
    navigate(`/WeatherForecast?city=${city}`);
  };

  const handleLocationUpdate = (latitude: number, longitude: number) => {
    navigate(`/WeatherForecast?lat=${latitude}&long=${longitude}`);
  };

  return (
    <div className={styles.container}>
      <SearchComponent onSearch={handleSubmit} />
      <div className={styles.separator}>or</div>
      <LocationButton onLocationUpdate={handleLocationUpdate} />
    </div>
  );
}

export default Search;
