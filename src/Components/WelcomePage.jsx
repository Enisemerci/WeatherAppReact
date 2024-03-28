import React, { useState } from "react";
import logo from "../Assets/Images/Logo.png";
import "../App.css";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";

const WelcomePage = ({ setCity }) => {
  const API_KEY = "3b02083a173c9f5cc9f48fd76c7157b9";
  const [enteredCity, setEnteredCity] = useState("");
  const handleChange = (event) => {
    setEnteredCity(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(enteredCity);
    setEnteredCity("");
  };

  const getLocation = () => {
    console.log("Fetching")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Tarayıcınız konum özelliğini desteklemiyor.");
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetchWeatherByCoordinates(latitude, longitude);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Konum izni reddedildi.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Konum bilgisi mevcut değil.");
        break;
      case error.TIMEOUT:
        alert("Konum bilgisini almak için zaman aşıldı.");
        break;
      case error.UNKNOWN_ERROR:
        alert("Bilinmeyen bir hata oluştu.");
        break;
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
      console.log("Loading")
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      setCity(response.data.name);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div>
    <form className="welcomePage" onSubmit={handleSubmit}>
      <img src={logo} alt="deneme" className="welcomePage-img" />
      <div className="welcomePage-desc">
        <h2>
          Welcome to <a href="https://github.com/Enisemerci">TypeWeather</a>
        </h2>
        <p>Choose a location to see the weather forecast</p>
        <input
          type="text"
          onChange={handleChange}
          value={enteredCity}
          placeholder="Search locaiton"
          className="welcomePage-input"
        />
        
      </div>
    </form>
    <button className="location-button" onClick={getLocation}>
          Use Your Location
        </button>
</div>
  );
};

export default WelcomePage;
