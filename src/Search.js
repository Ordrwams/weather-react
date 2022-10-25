import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let form = (
    <div className="row">
      <div className="col-9">
        <form id="form-name-of-city">
          <input
            type="search"
            className="form-control"
            id="nameOfCity"
            placeholder="Enter other city"
            autoComplete="off"
            onChange={updateCity}
          />
        </form>
      </div>
      <div className="col-1">
        <form onSubmit={handleSubmit}>
          <button
            type="Submit"
            className="btn btn-primary buttons"
            id="buttonSearch"
          >
            Search
          </button>
        </form>
      </div>
      <div className="col-2">
        <button
          type="submit"
          className="btn btn-primary buttons"
          id="buttonCurrentLocation"
        >
          Current location
        </button>
      </div>
    </div>
  );

  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [loaded, setLoaded] = useState(false);

  let day = null;
  let month = null;
  let minute = null;

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    if (date.getDate() < 10) {
      day = `0${date.getDate()}`;
    } else {
      day = date.getDate();
    }
    if (date.getMonth() + 1 < 10) {
      month = `0${date.getMonth() + 1}`;
      console.log(month);
    } else {
      month = date.getMonth() + 1;
      console.log(month);
    }
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  function formatDay(timestamp) {
    let date = new Date(timestamp);
    return Days[date.getDay()];
  }

  function formatTime(timestamp) {
    let date = new Date(timestamp);
    if (date.getMinutes() < 10) {
      minute = `0${date.getMinutes()}`;
    } else {
      minute = date.getMinutes();
    }
    return `${date.getHours()} : ${minute}`;
  }

  function handleResponse(response) {
    setLoaded(true);
    console.log(response);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      fullDate: formatDate(response.data.dt * 1000),
      weekDays: formatDay(response.data.dt * 1000),
      time: formatTime(response.data.dt * 1000),
    });
    return;
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0676ed9ef2a4ffe18d25c4c80b7e8b4a&units=metric`;
    axios.get(url).then(handleResponse);
    return;
  }
  if (loaded) {
    return (
      <div className="container">
        {form}
        <div className="row rowAboutOfDay">
          <div className="col-2">
            <div className="mainEmoji">
              <img src={weather.icon} alt="icon" id="icon-weather" />
            </div>
          </div>
          <div className="col-3">
            <ul>
              <li className="aboutOfDay city" id="cityName">
                {city}
              </li>
              <li className="aboutOfDay">
                <span className="temperature">
                  <span className="valueOfTemp">
                    {Math.round(weather.temperature)}
                  </span>
                  °
                </span>
                <a href="#" className="degreeC">
                  C |
                </a>
                <a href="#" className="degreeF">
                  F
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <ul>
              <li className="aboutOfDay">
                <span className="description">{weather.description}</span>
              </li>
              <li className="aboutOfDay">
                <strong>Humidity:</strong>{" "}
                <span className="humidity">{weather.humidity}</span> %
              </li>
              <li className="aboutOfDay">
                <strong>Wind speed:</strong>{" "}
                <span className="wind">{weather.wind}</span> m/h
              </li>
            </ul>
          </div>
          <div className="col-3">
            <ul>
              <li className="aboutOfDayLine date" id="fullDate">
                {weather.fullDate}
              </li>
              <li className="aboutOfDayLine" id="weekDays">
                {weather.weekDays}
              </li>
              <li className="aboutOfDayLine" id="time">
                {weather.time}
              </li>
            </ul>
          </div>
        </div>
        <div id="forecast"></div>
      </div>
    );
  } else {
    return <div className="container">{form}</div>;
  }
}
