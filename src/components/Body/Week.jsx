import React, { useEffect, useState } from "react";
import hero from "../../../public/hero.png";
import { GetCityDailyForcast } from "../../Api/Apis";

function Week({ weatherData }) {
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    const getDailyForecast = async () => {
      if (weatherData) {
        try {
          const response = await GetCityDailyForcast(weatherData.name);
          if (response.success) {
            setDailyForecast(response.data.list);
          }
        } catch (error) {
          console.error("Error fetching daily forecast:", error);
        }
      }
    };

    getDailyForecast();
  }, [weatherData]);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-6 gap-6">
        {dailyForecast.map((forecast, index) => (
          <div
            key={index}
            className="w-28 h-32 rounded-xl bg-gray-300 flex flex-col justify-center items-center text-black font-prompt-semibold gap-2 p-2"
          >
            <p>{getDayOfWeek(forecast.dt_txt)}</p>
            <img src={hero} className="w-14 h-16" alt="hero image" />
            <p className="text-xl">
              {Math.round(forecast.main.temp)}
              <span className="text-sm align-text-top">°C</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Week;
