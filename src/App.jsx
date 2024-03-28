import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WelcomePage from "./Components/WelcomePage";
import WeatherForecast from "./Components/WeatherForecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const API_KEY = "3b02083a173c9f5cc9f48fd76c7157b9";
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city.trim()) {
        // Şehir adı boş ise, istek göndermeyi engelle
        return;
      }
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch {
        console.log("Error fetching data");
      }
    };
    fetchWeatherData();
  }, [city]);

  return (
    <div className="app">
      {weatherData ? (
        <div className="appsearch">
          <WelcomePage setCity={setCity} />
          <WeatherForecast weatherData={weatherData} />
        </div>
      ) : (
        <WelcomePage setCity={setCity} />
      )}
    </div>
  );
}

export default App;
