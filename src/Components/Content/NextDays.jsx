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
  let iconImagePath;
  if (weatherData && weatherData.list[0].weather[0].main) {
    const weatherMain = weatherData.list[0].weather[0].main.toLowerCase();
    const date = new Date(weatherData.list[0].dt_txt);
    const hour = date.getHours();

    switch (weatherMain) {
      case "clear":
        iconImagePath = clearDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = clearNight;
          break;
        }
        break;
      case "clouds":
        iconImagePath = fewcloudDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = fewcloudNight;
          break;
        }
        break;
      case "rain":
        iconImagePath = rainDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = rainNight;
          break;
        }
        break;
      case "haze":
        iconImagePath = cloudyDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = cloudyNight;
          break;
        }
        break;
      case "snow":
        iconImagePath = stormDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = stormNight;
          break;
        }
        break;
      case "broken clouds":
        iconImagePath = clearDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = clearNight;
          break;
        }
        break;

      default:
        iconImagePath = fewcloudDay; // Varsayılan ikon
    }
  }

  return (
    <div className="nextday">
      <div className="nextday-container">
        {weatherData &&
          weatherData.list &&
          weatherData.list.length > 0 &&
          weatherData.list.slice(0, 5).map((item, index) => (
            <div className="nextday-day" key={index}>
              <p>{getDateInfo(item.dt)}</p>
              <img className="nextday-img" src={iconImagePath} alt="" />

              <p>{kelvinToCelsius(item.main.temp_min)}°C</p>

              <p>{kelvinToCelsius(item.main.temp_max)}°C</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NextDays;
