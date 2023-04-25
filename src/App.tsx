import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import Search from './components/Search/Search';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';



function App() {
  const [city, setCity] = useState('');

 
  return (
    <div className="App">
      <div className='centered-div'>
      <Router>
      <Routes>
        <Route path="/" element={<Search onCityChange={() => {}} />} />
        <Route path="/WeatherForecast" element={<WeatherForecast city={''} />} />
      </Routes>
    </Router>
    </div>
    </div>
  );
}

export default App;
