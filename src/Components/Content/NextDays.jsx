import React from "react";
import "./NextDays.css";
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

const NextDays = ({ weatherData }) => {
  const getDateInfo = (dt) => {
    const date = new Date(dt * 1000);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    return dayOfWeek;
  };

  const kelvinToCelsius = (temp) => {
    return Math.round(temp - 273.15);
  };

  const getWeatherIcon = (weatherMain, hour) => {
    let iconImagePath;
    switch (weatherMain) {
      case "Clear":
        iconImagePath = hour >= 20 || hour < 6 ? clearNight : clearDay;
        break;
      case "Clouds":
        iconImagePath = hour >= 20 || hour < 6 ? fewcloudNight : fewcloudDay;
        break;
      case "Rain":
        iconImagePath = hour >= 20 || hour < 6 ? rainNight : rainDay;
        break;
      case "Haze":
        iconImagePath = hour >= 20 || hour < 6 ? cloudyNight : cloudyDay;
        break;
      case "Snow":
        iconImagePath = hour >= 20 || hour < 6 ? stormNight : stormDay;
        break;
      default:
        iconImagePath = fewcloudDay; 
    }
    return iconImagePath;
  };

  return (
    <div className="nextday">
      <div className="nextday-container">
        {weatherData &&
          weatherData.list &&
          weatherData.list.length > 0 &&
          weatherData.list.slice(0, 5).map((item, index) => {
            const date = new Date(item.dt_txt);
            const hour = date.getHours();
            return (
              <div className="nextday-day" key={index}>
                <p>{getDateInfo(item.dt)}</p>
                <img className="nextday-img" src={getWeatherIcon(item.weather[0].main, hour)} alt="" />
                <p>{kelvinToCelsius(item.main.temp_min)}°C</p>
                <p>{kelvinToCelsius(item.main.temp_max)}°C</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NextDays;
