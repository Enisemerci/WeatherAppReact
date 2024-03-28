import React from "react";
import "./WeatherDetail.css";
import thermalIcon from "../../Assets/Icons/ThermalIcon.png";
import uvIndexIcon from "../../Assets/Icons/UvIndexIcon.png";
import windSpeedIcon from "../../Assets/Icons/WindSpeedIcon.png";
import rainIcon from "../../Assets/Icons/RainIcon.png";
import airHumadityIcon from "../../Assets/Icons/AirHumadityIcon.png";

const WeatherDetail = ({ weatherData }) => {
  return (
    <div className="detail">
      <ul className="detail-ul">
        <li className="detail-li">
          <div className="title">
            <img src={thermalIcon} alt="" /> <p>Thermal sesation</p>
          </div>
          <div>
            <h3>
              {Math.round(weatherData.list[0].main.feels_like - 273.15)}ºC
            </h3>
          </div>
        </li>
        <li className="detail-li">
          <div className="title">
            <img src={rainIcon} alt="" /> <p>Probability of rain</p>
          </div>
          <div>
            <h3>{weatherData.list[0].pop}%</h3>
          </div>
        </li>
        <li className="detail-li">
          <div className="title">
            <img src={windSpeedIcon} alt="" /> <p>Wind speed</p>
          </div>
          <div>
            <h3>{Math.round((weatherData.list[0].wind.speed)*1.60934)} km/h</h3>
          </div>
        </li>
        <li className="detail-li">
          <div className="title">
            <img src={airHumadityIcon} alt="" /> <p>Air humadity</p>
          </div>
          <div>
            <h3>{weatherData.list[0].main.humidity}%</h3>
          </div>
        </li>
        <li className="detail-li">
          <div className="title">
            <img src={uvIndexIcon} alt="" /> <p>Uv index</p>
          </div>
          <div>
            <h3>5</h3>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WeatherDetail;
