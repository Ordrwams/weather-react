import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let form = (
    <div class="row">
      <div class="col-9">
        <form id="form-name-of-city" onSubmit={handleSubmit}>
          <input
            type="text"
            class="form-control"
            id="nameOfCity"
            placeholder="Enter other city"
            autocomplete="off"
            onChange={updateCity}
          />
        </form>
      </div>
      <div class="col-1">
        <button type="submit" class="btn btn-primary buttons" id="buttonSearch">
          Search
        </button>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary buttons"
          id="buttonCurrentLocation"
        >
          Current location
        </button>
      </div>
    </div>
  );

  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});

  function handleResponse(response) {
    console.log(response);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
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

  return (
    <div class="container">
      {form}
      <div class="row rowAboutOfDay">
        <div class="col-2">
          <div class="mainEmoji">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt="icon"
              id="icon-weather"
            />
          </div>
        </div>
        <div class="col-3">
          <ul>
            <li class="aboutOfDay city" id="cityName">
              Poland
            </li>
            <li class="aboutOfDay">
              <span class="temperature">
                <span class="valueOfTemp">{weather}</span>°
              </span>
              <a href="#" class="degreeC"></a>
              <a href="#" class="degreeF">
                F
              </a>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <ul>
            <li class="aboutOfDay">
              <span class="description"> - </span>
            </li>
            <li class="aboutOfDay">
              <strong>Humidity:</strong> <span class="humidity">33</span> %
            </li>
            <li class="aboutOfDay">
              <strong>Wind speed:</strong> <span class="wind">26</span> m/h
            </li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li class="aboutOfDayLine date" id="fullDate">
              06.03.2022
            </li>
            <li class="aboutOfDayLine" id="weekDays">
              Tuesday
            </li>
            <li class="aboutOfDayLine" id="time">
              14:42
            </li>
          </ul>
        </div>
      </div>
      <div id="forecast"></div>
    </div>
  );
}
