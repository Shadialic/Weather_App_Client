import React, { useEffect, useState } from "react";
import bg from "../../../public/bgI.jpg";
import hero from "../../../public/hero.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getWeatherByCoords } from "../../Helpers/services.js";
import Body from "../Body/Body.jsx";
import { AddtoFavorites, getWeatherByCity } from "../../Api/Apis.jsx";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast, { Toaster } from "react-hot-toast";

function Hero() {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLong(longitude);
          const data = await getWeatherByCoords(latitude, longitude);
          setWeatherData(data);
        },
        (error) => {
          console.error("Error getting location:", error);
          setWeatherData(null);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      const data = await getWeatherByCity(search);
      setWeatherData(data.data);
      setSearch("");
    }
  };

  const getCurrentDateTime = () => {
    const options = { weekday: "long" };
    const day = new Date().toLocaleDateString(undefined, options);
    const time = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${day}, ${time}`;
  };

  const toggleFavorite = async (name, temp, desc, humidity) => {
    setIsFavorite(!isFavorite);
    try {
      const response = await AddtoFavorites({ name, temp, desc, humidity });
      if (response.data.success) {
        toast.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative h-auto overflow-auto">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex flex-row items-center justify-center h-full text-white p-8">
        <div className="w-[90%] h-auto flex flex-row bg-white rounded-lg">
          <div className="w-[90%] sm:w-[30%] p-4 rounded-y-xl shadow-lg bg-gray-900 bg-opacity-70 flex flex-col items-center justify-between">
            <div className="w-full flex flex-col">
              <div className="relative w-full">
                <input
                  type="search"
                  id="location-search"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search for city"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
              <img src={hero} alt="" className="mt-4 w-[90%]" />
              {weatherData && (
                <div className="flex flex-row items-start text-black mt-8">
                  <p className="text-[80px]">
                    {Math.round(weatherData.main.temp)}
                    <span className="text-[30px] align-text-top">°C</span>
                  </p>
                </div>
              )}
              <div className="flex flex-row items-start text-black">
                <p className="text-[17px]">{getCurrentDateTime()}</p>
              </div>
              <div className="w-full border-b-2 pt-3"></div>
              <div
                className="text-black flex gap-2 mt-6 text-[12px]"
                onClick={() =>
                  toggleFavorite(
                    weatherData?.name,
                    weatherData?.main.temp,
                    weatherData?.weather[0].description,
                    weatherData?.main.humidity
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {isFavorite ? (
                  <FavoriteIcon className="text-[10px] p-1" />
                ) : (
                  <FavoriteBorderIcon className="text-[10px] p-1" />
                )}
                <p className="pt-1">Add Favorite</p>
              </div>
              <div className="text-black flex gap-2 mt-2 text-[12px]">
                <CloudIcon className="text-[10px] p-1" />
                <p className="pt-1">Partially Cloudy</p>
              </div>
              <div className="text-black flex gap-2 mt-2 text-[12px]">
                <WaterDropIcon className="text-[4px] p-1" />
                <p className="pt-1">
                  Perc - {Math.round(weatherData?.rain?.["1h"]) || "No data"}%
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row mt-4 pt-4">
              <LocationOnIcon className="text-white" />
              <p className="text-white">
                {weatherData?.name ? weatherData.name : "Unknown location"}
              </p>
            </div>
          </div>
          <Body weatherData={weatherData} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Hero;
