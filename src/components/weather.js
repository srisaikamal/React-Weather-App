import React, { useState } from "react";
import axios from "axios";
import "./weather.scss";
const Weather = () => {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const API_KEY = "6f2c94ef51e1b547322d11fac29402b0";
  const [mainweather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${API_URL}${query}&units=metric&appid=${API_KEY}`)
        .then((result) => {
          setWeather(result);
          console.log(result.data);
        });
    }
  };

  return (
    <div className="main">
      <div className="main--center">
        <input
          className="main--search-box"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyPress={fetchData}
          placeholder="City name or ZIP"
        />

        {typeof mainweather.data != "undefined" ? (
          <div className="center">
            <h1 className="main--temp">
              {" "}
              {Math.round(mainweather.data.main.temp)} °C
            </h1>

            <h2 className="main--country">
              {mainweather.data.name}, {mainweather.data.sys.country}
            </h2>
            <h3 className="main--status">
              {mainweather.data.weather[0].description} in{" "}
              {mainweather.data.name}
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Weather;
