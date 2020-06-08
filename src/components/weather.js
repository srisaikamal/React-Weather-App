import React, { useState } from "react";
import axios from "axios";
import "./weather.scss";
import CountUp from "react-countup";

const Weather = () => {
  const API_URL = "api.openweathermap.org/data/2.5/weather?q=";
  const API_KEY = "6f2c94ef51e1b547322d11fac29402b0";
  const [mainweather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`https://${API_URL}${query}&units=metric&appid=${API_KEY}`)
        .then((result) => {
          setWeather(result);
        });
    }
  };
  const fetchDataButton = () => {
    axios
      .get(`https://${API_URL}${query}&units=metric&appid=${API_KEY}`)
      .then((result) => {
        setWeather(result);
      });
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
        <button onClick={fetchDataButton} className="button">
          Search
        </button>
        {/* Need to add an Error message here if the user typees invalid city name or zip.  */}
        {typeof mainweather.data != "undefined" ? (
          <div className="center">
            <h1 className="main--temp">
              {" "}
              <CountUp
                start={0}
                end={Math.round(mainweather.data.main.temp)}
                duration={2.75}
              />
              °C
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
      <footer className="footer">
        <p>
          &copy; 2020 Open-Source Project By{" "}
          <a className="footer--links" href="https://vsskamal.me">
            vsskamal
          </a>{" "}
          available on{" "}
          <a
            className="footer--links"
            href="https://github.com/srisaikamal/React-Weather-App"
          >
            GitHub
          </a>{" "}
          . Give a STAR if you like.{" "}
          <a className="footer--links" href="openweathermap.org">
            OpenWeatherMap
          </a>{" "}
          for API.
          <a href="https://www.netlify.com">
            <img
              className="netlify"
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt="Deploys by Netlify"
            />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Weather;
