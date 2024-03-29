import React, { useEffect, useState } from "react";
import "./Card.css";

// İkonları import et
import clearDay from "../../Assets/Icons/ClearDay.png";
import clearNight from "../../Assets/Icons/ClearNight.png";
import cloudyDay from "../../Assets/Icons/CloudyDay.png";
import cloudyNight from "../../Assets/Icons/CloudyNight.png";
import fewcloudDay from "../../Assets/Icons/FewcloudDay.png";
import fewcloudNight from "../../Assets/Icons/FewcloudNight.png";
import rainDay from "../../Assets/Icons/RainDay.png";
import rainNight from "../../Assets/Icons/RainNight.png";
import stormDay from "../../Assets/Icons/StormDay.png";
import stormNight from "../../Assets/Icons/StormNight.png";

const Card = ({ weatherData }) => {
  const [backgroundClass, setBackgroundClass] = useState("");
  const [iconImagePath, setIconImagePath] = useState("");

  useEffect(() => {
    if (weatherData && weatherData.list[0].weather[0].main) {
      const weatherMain = weatherData.list[0].weather[0].main.toLowerCase();
      const date = new Date(weatherData.list[0].dt_txt);
      const hour = date.getHours();
      setBackgroundClass(getBackgroundClass(weatherMain, hour));
      setIconImagePath(getIconImagePath(weatherMain, hour));
    }
  }, [weatherData]);

  // Saate göre arka plan rengini belirle
  const getBackgroundClass = (weatherMain, hour) => {
    if (hour >= 20 || hour < 6) {
      return `weather-bg-n-${weatherMain}`;
    }
    return `weather-bg-${weatherMain}`;
  };

  // Saate ve hava durumuna göre ikon yolu belirle
  const getIconImagePath = (weatherMain, hour) => {
    switch (weatherMain) {
      case "clear":
        return hour >= 20 || hour < 6 ? clearNight : clearDay;
      case "clouds":
        return hour >= 20 || hour < 6 ? cloudyNight : fewcloudDay;
      case "rain":
        return hour >= 20 || hour < 6 ? rainNight : rainDay;
      case "haze":
        return hour >= 20 || hour < 6 ? cloudyNight : cloudyDay;
      case "snow":
        return hour >= 20 || hour < 6 ? stormNight : stormDay;
      case "broken clouds":
        return hour >= 20 || hour < 6 ? clearNight : clearDay;
      default:
        return fewcloudDay; // Varsayılan ikon
    }
  };

  return (
    <div className={`card ${backgroundClass}`}>
      <h2 className="card-place">
        {weatherData.city.name}, {weatherData.city.country}
      </h2>
      <p className="card-date">{weatherData.list[0].dt_txt}</p>
      <img className="card-icon" src={iconImagePath} alt="" />
      <h1 className="card-degree">
        {Math.round(weatherData.list[0].main.temp - 273.15)}°C
      </h1>
      <h2 className="card-lmdegree">
        {Math.round(weatherData.list[0].main.temp_min - 273.15)}°C{" "}
        {Math.round(weatherData.list[0].main.temp_max - 273.15)}°C
      </h2>
      <p className="card-desc">{weatherData.list[0].weather[0].description}</p>
    </div>
  );
};

export default Card;
