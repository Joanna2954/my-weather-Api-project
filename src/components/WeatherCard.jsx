import React, { useEffect, useState } from 'react';

const API_KEY = '3a0591d74322eeb0947f92997ed014b5';

function WeatherCard() {
  const [city, setCity] = useState('London');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => { fetchWeather(city); }, [city]);

  const fetchWeather = async (targetCity) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setWeather(null);
      alert('City not found!');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery('');
    }
  };

  // Function to choose weather icon
  const renderWeatherIcon = () => {
    if (!weather) return null;

    const condition = weather.weather[0].main.toLowerCase();
    const temp = weather.main.temp;

    if (condition.includes("rain")) {
      return (
        <svg width="80" height="60" viewBox="0 0 64 64" fill="none">
          <ellipse cx="24" cy="40" rx="18" ry="10" fill="#cce6ff"/>
          <ellipse cx="44" cy="38" rx="12" ry="9" fill="#99d6ff"/>
          <line x1="20" y1="50" x2="20" y2="60" stroke="#00aaff" strokeWidth="3"/>
          <line x1="30" y1="50" x2="30" y2="60" stroke="#00aaff" strokeWidth="3"/>
          <line x1="40" y1="50" x2="40" y2="60" stroke="#00aaff" strokeWidth="3"/>
        </svg>
      );
    } else if (condition.includes("snow")) {
      return (
        <svg width="80" height="60" viewBox="0 0 64 64" fill="none">
          <ellipse cx="24" cy="40" rx="18" ry="10" fill="#e0f7ff"/>
          <ellipse cx="44" cy="38" rx="12" ry="9" fill="#b3ecff"/>
          <text x="20" y="55" fontSize="24">❄️</text>
          <text x="40" y="55" fontSize="24">❄️</text>
        </svg>
      );
    } else if (temp <= 10) {
      // Cold
      return (
        <svg width="80" height="60" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="18" fill="#a3d9ff"/>
          <text x="24" y="40" fontSize="22">❄️</text>
        </svg>
      );
    } else if (temp >= 30) {
      // Hot & sunny
      return (
        <svg width="80" height="60" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="16" fill="#ffdb4d"/>
          <g stroke="#ffcc00" strokeWidth="2">
            <line x1="32" y1="4" x2="32" y2="0"/>
            <line x1="32" y1="64" x2="32" y2="60"/>
            <line x1="4" y1="32" x2="0" y2="32"/>
            <line x1="64" y1="32" x2="60" y2="32"/>
            <line x1="10" y1="10" x2="6" y2="6"/>
            <line x1="54" y1="54" x2="58" y2="58"/>
            <line x1="10" y1="54" x2="6" y2="58"/>
            <line x1="54" y1="10" x2="58" y2="6"/>
          </g>
        </svg>
      );
    } else {
      // Default (cloudy with sun)
      return (
        <svg width="84" height="54" viewBox="0 0 84 54" fill="none">
          <ellipse cx="34" cy="38" rx="28" ry="16" fill="#f6f8fa"/>
          <ellipse cx="54" cy="35" rx="15" ry="13" fill="#d1eefd"/>
          <circle cx="55" cy="18" r="11" fill="#ffe178"/>
          
        </svg>
      );
    }
  };
 
  return (
    <div className="glass-card">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">
          <svg height="20" viewBox="0 0 24 24" width="20">
            <circle cx="11" cy="11" r="7" strokeWidth="2"/>
            <line x1="16.65" y1="16.65" x2="21" y2="21" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </form>
      <div className="weather-content">
        <div className="weather-icon">
          {renderWeatherIcon()}
        </div>
        <div className="weather-temp">
          {weather ? Math.round(weather.main.temp) : '--'}
          <span>°C</span>
        </div>
        <div className="weather-city">
          {weather ? weather.name : city}
        </div>
        <div className="weather-stats">
          <div className="stat">
            <svg width="22" height="22" fill="none" style={{marginRight:2}}>
              <path 
                d="M11 20s5-5.5 5-9A5 5 0 0 0 6 11c0 3.5 5 9 5 9z" 
                className="stat-icon"
                stroke="currentColor"
              />
            </svg>
            <span>{weather ? weather.main.humidity : '--'}%</span>
            <div className="stat-title">Humidity</div>
          </div>
          <div className="stat">
            <svg width="23" height="23" fill="none" style={{marginRight:2}}>
              <path 
                d="M3 11h17M17 11l-3-3M17 11l-3 3" 
                className="stat-icon"
                stroke="currentColor"
              />
            </svg>
            <span>
              {weather ? Math.round(weather.wind.speed) : '--'} km/h
            </span>
            <div className="stat-title">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
